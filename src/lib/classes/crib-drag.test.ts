import { describe, it, expect, beforeEach } from "vitest";
import {
  hexToBytes,
  bytesToHex,
  hexToString,
  stringToHex,
  hexXor,
  isPrintableAscii,
  looksLikeText,
  isValidHex,
  CribDrag,
} from "./crib-drag.svelte";

// ============================================================================
// Utility Function Tests
// ============================================================================

describe("hexToBytes", () => {
  it("converts empty string to empty array", () => {
    expect(hexToBytes("")).toEqual([]);
  });

  it("converts single byte", () => {
    expect(hexToBytes("00")).toEqual([0]);
    expect(hexToBytes("ff")).toEqual([255]);
    expect(hexToBytes("FF")).toEqual([255]);
    expect(hexToBytes("7f")).toEqual([127]);
  });

  it("converts multiple bytes", () => {
    expect(hexToBytes("0102")).toEqual([1, 2]);
    expect(hexToBytes("deadbeef")).toEqual([222, 173, 190, 239]);
  });

  it("handles whitespace in input", () => {
    expect(hexToBytes("de ad be ef")).toEqual([222, 173, 190, 239]);
    expect(hexToBytes("  de  ad  ")).toEqual([222, 173]);
  });

  it("handles mixed case", () => {
    expect(hexToBytes("DeAdBeEf")).toEqual([222, 173, 190, 239]);
  });
});

describe("bytesToHex", () => {
  it("converts empty array to empty string", () => {
    expect(bytesToHex([])).toBe("");
  });

  it("converts single byte", () => {
    expect(bytesToHex([0])).toBe("00");
    expect(bytesToHex([255])).toBe("ff");
    expect(bytesToHex([127])).toBe("7f");
  });

  it("converts multiple bytes", () => {
    expect(bytesToHex([1, 2])).toBe("0102");
    expect(bytesToHex([222, 173, 190, 239])).toBe("deadbeef");
  });

  it("pads single digit hex values", () => {
    expect(bytesToHex([0, 1, 15])).toBe("00010f");
  });
});

describe("hexToString", () => {
  it("converts empty string to empty string", () => {
    expect(hexToString("")).toBe("");
  });

  it("converts ASCII hex to string", () => {
    expect(hexToString("48656c6c6f")).toBe("Hello");
    expect(hexToString("576f726c64")).toBe("World");
  });

  it("handles spaces in input", () => {
    expect(hexToString("48 65 6c 6c 6f")).toBe("Hello");
  });

  it("converts space character", () => {
    expect(hexToString("20")).toBe(" ");
  });

  it("handles special characters", () => {
    expect(hexToString("21")).toBe("!");
    expect(hexToString("3f")).toBe("?");
  });
});

describe("stringToHex", () => {
  it("converts empty string to empty string", () => {
    expect(stringToHex("")).toBe("");
  });

  it("converts ASCII string to hex", () => {
    expect(stringToHex("Hello")).toBe("48656c6c6f");
    expect(stringToHex("World")).toBe("576f726c64");
  });

  it("converts space character", () => {
    expect(stringToHex(" ")).toBe("20");
  });

  it("converts special characters", () => {
    expect(stringToHex("!")).toBe("21");
    expect(stringToHex("?")).toBe("3f");
  });

  it("roundtrips with hexToString", () => {
    const original = "The quick brown fox";
    expect(hexToString(stringToHex(original))).toBe(original);
  });
});

describe("hexXor", () => {
  it("XORs empty strings", () => {
    expect(hexXor("", "")).toBe("");
  });

  it("XORs identical values to zero", () => {
    expect(hexXor("ff", "ff")).toBe("00");
    expect(hexXor("deadbeef", "deadbeef")).toBe("00000000");
  });

  it("XORs with zero yields original", () => {
    expect(hexXor("ff", "00")).toBe("ff");
    expect(hexXor("deadbeef", "00000000")).toBe("deadbeef");
  });

  it("XORs different length strings (uses shorter)", () => {
    expect(hexXor("ff00", "ff")).toBe("00");
    expect(hexXor("ff", "ff00")).toBe("00");
  });

  it("XORs correctly", () => {
    expect(hexXor("0f", "f0")).toBe("ff");
    expect(hexXor("aa", "55")).toBe("ff");
  });

  it("is commutative", () => {
    expect(hexXor("3b101c091d53320c000910", "071d154502010a04000419")).toBe(
      hexXor("071d154502010a04000419", "3b101c091d53320c000910"),
    );
  });

  it("demonstrates key reuse vulnerability", () => {
    // C1 = M1 XOR K, C2 = M2 XOR K
    // C1 XOR C2 = M1 XOR M2 (key cancels out)
    const key = stringToHex("secretkey");
    const m1 = stringToHex("Hello");
    const m2 = stringToHex("World");

    const c1 = hexXor(m1, key.slice(0, m1.length));
    const c2 = hexXor(m2, key.slice(0, m2.length));

    const c1XorC2 = hexXor(c1, c2);
    const m1XorM2 = hexXor(m1, m2);

    expect(c1XorC2).toBe(m1XorM2);
  });
});

describe("isPrintableAscii", () => {
  it("returns true for empty string", () => {
    expect(isPrintableAscii("")).toBe(true);
  });

  it("returns true for printable ASCII", () => {
    expect(isPrintableAscii("Hello, World!")).toBe(true);
    expect(isPrintableAscii("abc123")).toBe(true);
    expect(isPrintableAscii(" !@#$%^&*()")).toBe(true);
  });

  it("returns false for control characters", () => {
    expect(isPrintableAscii("\x00")).toBe(false);
    expect(isPrintableAscii("\x1f")).toBe(false);
    expect(isPrintableAscii("Hello\x00World")).toBe(false);
  });

  it("returns false for DEL character", () => {
    expect(isPrintableAscii("\x7f")).toBe(false);
  });

  it("returns false for extended ASCII", () => {
    expect(isPrintableAscii("\x80")).toBe(false);
    expect(isPrintableAscii("café")).toBe(false);
  });
});

describe("looksLikeText", () => {
  it("returns false for empty string", () => {
    expect(looksLikeText("")).toBe(false);
  });

  it("returns true for normal English text", () => {
    expect(looksLikeText("Hello World")).toBe(true);
    expect(looksLikeText("The quick brown fox")).toBe(true);
  });

  it("returns false for mostly special characters", () => {
    expect(looksLikeText("!@#$%^&*()")).toBe(false);
    expect(looksLikeText("...---...")).toBe(false);
  });

  it("returns false for non-printable characters", () => {
    expect(looksLikeText("\x00\x01\x02")).toBe(false);
  });

  it("allows some punctuation in text", () => {
    expect(looksLikeText("Hello, World! How's it going?")).toBe(true);
  });
});

describe("isValidHex", () => {
  it("returns true for empty string", () => {
    expect(isValidHex("")).toBe(true);
  });

  it("returns true for valid hex", () => {
    expect(isValidHex("0123456789")).toBe(true);
    expect(isValidHex("abcdef")).toBe(true);
    expect(isValidHex("ABCDEF")).toBe(true);
    expect(isValidHex("DeAdBeEf")).toBe(true);
  });

  it("returns true for hex with spaces", () => {
    expect(isValidHex("de ad be ef")).toBe(true);
  });

  it("returns false for non-hex characters", () => {
    expect(isValidHex("ghij")).toBe(false);
    expect(isValidHex("Hello")).toBe(false);
    expect(isValidHex("0x123")).toBe(false);
  });
});

// ============================================================================
// CribDrag Class Tests
// ============================================================================

describe("CribDrag", () => {
  let cribDrag: CribDrag;

  beforeEach(() => {
    cribDrag = new CribDrag();
  });

  describe("addMessage", () => {
    it("adds a valid hex message", () => {
      const msg = cribDrag.addMessage("deadbeef");
      expect(msg).not.toBeNull();
      expect(msg!.encrypted).toBe("deadbeef");
      expect(msg!.decrypted).toBe("");
      expect(cribDrag.messages).toHaveLength(1);
    });

    it("normalizes hex to lowercase", () => {
      const msg = cribDrag.addMessage("DEADBEEF");
      expect(msg!.encrypted).toBe("deadbeef");
    });

    it("strips whitespace", () => {
      const msg = cribDrag.addMessage("de ad be ef");
      expect(msg!.encrypted).toBe("deadbeef");
    });

    it("returns null for invalid hex", () => {
      const msg = cribDrag.addMessage("not hex");
      expect(msg).toBeNull();
      expect(cribDrag.messages).toHaveLength(0);
    });

    it("prevents duplicate messages", () => {
      cribDrag.addMessage("deadbeef");
      const duplicate = cribDrag.addMessage("deadbeef");
      expect(duplicate).toBeNull();
      expect(cribDrag.messages).toHaveLength(1);
    });

    it("sets first message as active", () => {
      const msg = cribDrag.addMessage("deadbeef");
      expect(cribDrag.activeMessageId).toBe(msg!.id);
    });

    it("does not change active message when adding more", () => {
      const msg1 = cribDrag.addMessage("deadbeef");
      cribDrag.addMessage("cafebabe");
      expect(cribDrag.activeMessageId).toBe(msg1!.id);
    });
  });

  describe("removeMessage", () => {
    it("removes an existing message", () => {
      const msg = cribDrag.addMessage("deadbeef");
      const result = cribDrag.removeMessage(msg!.id);
      expect(result).toBe(true);
      expect(cribDrag.messages).toHaveLength(0);
    });

    it("returns false for non-existent message", () => {
      const result = cribDrag.removeMessage("fake-id");
      expect(result).toBe(false);
    });

    it("updates active message when active is removed", () => {
      const msg1 = cribDrag.addMessage("deadbeef");
      const msg2 = cribDrag.addMessage("cafebabe");
      cribDrag.removeMessage(msg1!.id);
      expect(cribDrag.activeMessageId).toBe(msg2!.id);
    });

    it("clears active message when last is removed", () => {
      const msg = cribDrag.addMessage("deadbeef");
      cribDrag.removeMessage(msg!.id);
      expect(cribDrag.activeMessageId).toBeNull();
    });
  });

  describe("setCrib", () => {
    it("sets the crib", () => {
      cribDrag.setCrib("hello");
      expect(cribDrag.crib).toBe("hello");
    });

    it("resets selected position", () => {
      cribDrag.addMessage("deadbeefdeadbeef");
      cribDrag.addMessage("cafebabecafebabe");
      cribDrag.setCrib("test");
      cribDrag.selectPosition(0);
      expect(cribDrag.selectedPosition).toBe(0);

      cribDrag.setCrib("new crib");
      expect(cribDrag.selectedPosition).toBeNull();
    });
  });

  describe("setActiveMessage", () => {
    it("sets active message", () => {
      const msg1 = cribDrag.addMessage("deadbeef");
      const msg2 = cribDrag.addMessage("cafebabe");
      cribDrag.setActiveMessage(msg2!.id);
      expect(cribDrag.activeMessageId).toBe(msg2!.id);
    });

    it("ignores invalid message id", () => {
      const msg1 = cribDrag.addMessage("deadbeef");
      cribDrag.setActiveMessage("fake-id");
      expect(cribDrag.activeMessageId).toBe(msg1!.id);
    });
  });

  describe("cribHex derived", () => {
    it("converts crib to hex", () => {
      cribDrag.setCrib("Hello");
      expect(cribDrag.cribHex).toBe("48656c6c6f");
    });

    it("is empty when crib is empty", () => {
      expect(cribDrag.cribHex).toBe("");
    });
  });

  describe("messageXors derived", () => {
    it("is empty with less than 2 messages", () => {
      expect(cribDrag.messageXors).toEqual([]);
      cribDrag.addMessage("deadbeef");
      expect(cribDrag.messageXors).toEqual([]);
    });

    it("computes XOR between message pairs", () => {
      cribDrag.addMessage("ff00");
      cribDrag.addMessage("00ff");
      expect(cribDrag.messageXors).toHaveLength(1);
      expect(cribDrag.messageXors[0].xorResult).toBe("ffff");
    });

    it("computes all pairs for multiple messages", () => {
      cribDrag.addMessage("aa");
      cribDrag.addMessage("bb");
      cribDrag.addMessage("cc");
      // 3 messages = 3 pairs: (0,1), (0,2), (1,2)
      expect(cribDrag.messageXors).toHaveLength(3);
    });
  });

  describe("cribResults derived", () => {
    it("is empty without crib", () => {
      cribDrag.addMessage("deadbeef");
      cribDrag.addMessage("cafebabe");
      expect(cribDrag.cribResults).toEqual([]);
    });

    it("is empty with less than 2 messages", () => {
      cribDrag.addMessage("deadbeef");
      cribDrag.setCrib("test");
      expect(cribDrag.cribResults).toEqual([]);
    });

    it("computes results for valid crib", () => {
      // Create two messages encrypted with same key
      const key = "secretkey";
      const m1 = "Hello";
      const m2 = "World";

      const keyHex = stringToHex(key);
      const c1 = hexXor(stringToHex(m1), keyHex.slice(0, 10));
      const c2 = hexXor(stringToHex(m2), keyHex.slice(0, 10));

      cribDrag.addMessage(c1);
      cribDrag.addMessage(c2);
      cribDrag.setCrib("Hello");

      // Should have results for each possible position
      expect(cribDrag.cribResults.length).toBeGreaterThan(0);
    });
  });

  describe("clear", () => {
    it("resets all state", () => {
      cribDrag.addMessage("deadbeef");
      cribDrag.addMessage("cafebabe");
      cribDrag.setCrib("test");
      cribDrag.selectPosition(0);

      cribDrag.clear();

      expect(cribDrag.messages).toEqual([]);
      expect(cribDrag.crib).toBe("");
      expect(cribDrag.selectedPosition).toBeNull();
      expect(cribDrag.activeMessageId).toBeNull();
    });
  });

  describe("resetDecryption", () => {
    it("clears crib and decrypted but keeps messages", () => {
      cribDrag.addMessage("deadbeef");
      cribDrag.addMessage("cafebabe");
      cribDrag.setCrib("test");

      cribDrag.resetDecryption();

      expect(cribDrag.messages).toHaveLength(2);
      expect(cribDrag.crib).toBe("");
      expect(cribDrag.messages[0].decrypted).toBe("");
    });
  });

  describe("exportState / importState", () => {
    it("exports current state", () => {
      cribDrag.addMessage("deadbeef");
      cribDrag.setCrib("test");
      cribDrag.messages[0].decrypted = "partial";

      const exported = cribDrag.exportState();

      expect(exported.messages).toHaveLength(1);
      expect(exported.messages[0].encrypted).toBe("deadbeef");
      expect(exported.messages[0].decrypted).toBe("partial");
      expect(exported.crib).toBe("test");
    });

    it("imports state", () => {
      const state = {
        messages: [
          { encrypted: "deadbeef", decrypted: "test" },
          { encrypted: "cafebabe" },
        ],
        crib: "hello",
      };

      cribDrag.importState(state);

      expect(cribDrag.messages).toHaveLength(2);
      expect(cribDrag.messages[0].decrypted).toBe("test");
      expect(cribDrag.messages[1].decrypted).toBe("");
      expect(cribDrag.crib).toBe("hello");
    });

    it("clears existing state before import", () => {
      cribDrag.addMessage("deadbeef");
      cribDrag.importState({ messages: [{ encrypted: "cafebabe" }] });
      expect(cribDrag.messages).toHaveLength(1);
      expect(cribDrag.messages[0].encrypted).toBe("cafebabe");
    });
  });

  describe("updateDecrypted", () => {
    it("updates decrypted text for a message", () => {
      const msg = cribDrag.addMessage("deadbeef");
      cribDrag.updateDecrypted(msg!.id, "decrypted text");
      expect(cribDrag.messages[0].decrypted).toBe("decrypted text");
    });

    it("does nothing for invalid id", () => {
      cribDrag.addMessage("deadbeef");
      cribDrag.updateDecrypted("fake-id", "text");
      expect(cribDrag.messages[0].decrypted).toBe("");
    });
  });
});

// ============================================================================
// Integration Tests - Real Crib Dragging Scenario
// ============================================================================

describe("Crib Drag Integration", () => {
  it("demonstrates full crib dragging workflow", () => {
    const cribDrag = new CribDrag();

    // Simulate two messages encrypted with the same OTP key
    // In reality, attacker only has ciphertexts, not plaintexts
    const key = stringToHex("SUPERSECRET");
    const plain1 = "Hello Alice";
    const plain2 = "Attack Now!";

    const cipher1 = hexXor(stringToHex(plain1), key);
    const cipher2 = hexXor(stringToHex(plain2), key);

    // Add the ciphertexts
    cribDrag.addMessage(cipher1);
    cribDrag.addMessage(cipher2);

    // Attacker guesses "the " might be in one message
    // Actually, let's use something that IS in our test messages
    cribDrag.setCrib("Hello");

    // The crib results should contain one position where
    // XORing reveals readable text in the other message
    const results = cribDrag.cribResults;

    // At position 0, "Hello" XOR'd with cipher1 gives key fragment
    // That key fragment XOR'd with cipher2 should give "Attac"
    const correctPosition = results.find((r) => r.position === 0);
    expect(correctPosition).toBeDefined();
    expect(correctPosition!.decryptedParts[0]).toBe("Hello"); // The crib itself
    expect(correctPosition!.decryptedParts[1]).toBe("Attac"); // What it decrypts in msg2
  });

  it("filters likely text results", () => {
    const cribDrag = new CribDrag();

    const key = stringToHex("SECRETKEY123456");
    const plain1 = "Meeting at noon";
    const plain2 = "Bring the files";

    const cipher1 = hexXor(stringToHex(plain1), key);
    const cipher2 = hexXor(stringToHex(plain2), key);

    cribDrag.addMessage(cipher1);
    cribDrag.addMessage(cipher2);
    cribDrag.setCrib("the ");

    // "the " appears at position 6 in plain2 ("Bring the files")
    // At that position, it should reveal "g at" from plain1
    const results = cribDrag.cribResults;

    // Find results that look like text
    const textLikeResults = results.filter((r) => r.looksLikeText);

    // Should have some results that look like readable text
    expect(textLikeResults.length).toBeGreaterThan(0);
  });
});
