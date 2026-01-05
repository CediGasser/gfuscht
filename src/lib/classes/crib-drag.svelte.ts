/**
 * Crib Drag - A cryptanalysis tool for breaking XOR-based encryption
 * when the same key is reused (OTP key reuse attack)
 *
 * This module provides utilities for crib dragging, a technique where
 * a known/guessed plaintext (the "crib") is XORed at different positions
 * to reveal parts of other messages encrypted with the same key.
 */

// ============================================================================
// Utility Functions (Pure, testable)
// ============================================================================

/**
 * Decodes a hexadecimal string into a byte array
 */
export function hexToBytes(hexString: string): number[] {
  const result: number[] = [];
  const normalized = hexString.replace(/\s/g, "");
  for (let i = 0; i < normalized.length; i += 2) {
    result.push(parseInt(normalized.substring(i, i + 2), 16));
  }
  return result;
}

/**
 * Converts a byte array to a hexadecimal string
 */
export function bytesToHex(bytes: number[]): string {
  return bytes
    .map((byte) => (byte & 0xff).toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Converts a hexadecimal string to an ASCII string
 */
export function hexToString(hex: string): string {
  let result = "";
  const normalized = hex.replace(/\s/g, "");
  for (let i = 0; i < normalized.length; i += 2) {
    const charCode = parseInt(normalized.substring(i, i + 2), 16);
    result += String.fromCharCode(charCode);
  }
  return result;
}

/**
 * Converts an ASCII string to a hexadecimal string
 */
export function stringToHex(str: string): string {
  return str
    .split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

/**
 * XORs two hexadecimal strings together
 * Result length matches the shorter input
 */
export function hexXor(a: string, b: string): string {
  const aBytes = hexToBytes(a);
  const bBytes = hexToBytes(b);
  const minLength = Math.min(aBytes.length, bBytes.length);
  const result: number[] = [];

  for (let i = 0; i < minLength; i++) {
    result.push(aBytes[i] ^ bBytes[i]);
  }

  return bytesToHex(result);
}

/**
 * Checks if a string contains only printable ASCII characters
 */
export function isPrintableAscii(str: string): boolean {
  return /^[\x20-\x7E]*$/.test(str);
}

/**
 * Checks if a string looks like it could be readable text
 * (contains mostly alphanumeric characters and common punctuation)
 */
export function looksLikeText(str: string): boolean {
  if (str.length === 0) return false;
  if (!isPrintableAscii(str)) return false;
  // Check if at least 70% of characters are alphanumeric or space
  const alphanumericCount = (str.match(/[a-zA-Z0-9 ]/g) || []).length;
  return alphanumericCount / str.length >= 0.7;
}

/**
 * Validates if a string is valid hexadecimal
 */
export function isValidHex(str: string): boolean {
  return /^[0-9a-fA-F]*$/.test(str.replace(/\s/g, ""));
}

// ============================================================================
// Types
// ============================================================================

export interface Message {
  id: string;
  encrypted: string;
  decrypted: string;
}

export interface CribResult {
  position: number;
  decryptedParts: string[];
  isPrintable: boolean;
  looksLikeText: boolean;
}

// ============================================================================
// CribDrag Class with Svelte 5 Runes
// ============================================================================

export class CribDrag {
  // Reactive state using $state rune
  messages = $state<Message[]>([]);
  crib = $state("");
  selectedPosition = $state<number | null>(null);
  activeMessageId = $state<string | null>(null);

  // Derived state using $derived rune
  cribHex = $derived(stringToHex(this.crib));

  // Compute XOR of all messages (M1 ⊕ M2 = C1 ⊕ C2 when same key used)
  messageXors = $derived.by(() => {
    if (this.messages.length < 2) return [];

    const xors: { msg1Id: string; msg2Id: string; xorResult: string }[] = [];

    for (let i = 0; i < this.messages.length; i++) {
      for (let j = i + 1; j < this.messages.length; j++) {
        const msg1 = this.messages[i];
        const msg2 = this.messages[j];
        xors.push({
          msg1Id: msg1.id,
          msg2Id: msg2.id,
          xorResult: hexXor(msg1.encrypted, msg2.encrypted),
        });
      }
    }

    return xors;
  });

  // Compute possible crib positions and what they would decrypt to
  cribResults = $derived.by(() => {
    if (!this.crib || this.messages.length < 2 || !this.activeMessageId) {
      return [];
    }

    const activeMessage = this.messages.find(
      (m) => m.id === this.activeMessageId,
    );
    if (!activeMessage) return [];

    const cribHex = stringToHex(this.crib);
    const results: CribResult[] = [];

    // Slide the crib across the active message
    for (
      let pos = 0;
      pos <= activeMessage.encrypted.length - cribHex.length;
      pos += 2
    ) {
      const bytePosition = pos / 2;
      const encryptedPart = activeMessage.encrypted.slice(
        pos,
        pos + cribHex.length,
      );

      // XOR crib with the encrypted part to get key fragment
      const keyFragment = hexXor(cribHex, encryptedPart);

      // Use this key fragment to decrypt the same position in other messages
      const decryptedParts: string[] = [];
      let allPrintable = true;
      let anyLooksLikeText = false;

      for (const msg of this.messages) {
        if (msg.id === this.activeMessageId) {
          decryptedParts.push(this.crib);
          continue;
        }

        const msgPart = msg.encrypted.slice(pos, pos + cribHex.length);
        if (msgPart.length < cribHex.length) {
          decryptedParts.push("");
          allPrintable = false;
          continue;
        }

        const decryptedHex = hexXor(keyFragment, msgPart);
        const decryptedText = hexToString(decryptedHex);
        decryptedParts.push(decryptedText);

        if (!isPrintableAscii(decryptedText)) {
          allPrintable = false;
        }
        if (looksLikeText(decryptedText)) {
          anyLooksLikeText = true;
        }
      }

      results.push({
        position: bytePosition,
        decryptedParts,
        isPrintable: allPrintable,
        looksLikeText: anyLooksLikeText || allPrintable,
      });
    }

    return results;
  });

  // Derived key based on selected position and crib
  derivedKeyFragment = $derived.by(() => {
    if (this.selectedPosition === null || !this.crib || !this.activeMessageId) {
      return null;
    }

    const activeMessage = this.messages.find(
      (m) => m.id === this.activeMessageId,
    );
    if (!activeMessage) return null;

    const cribHex = stringToHex(this.crib);
    const pos = this.selectedPosition * 2;
    const encryptedPart = activeMessage.encrypted.slice(
      pos,
      pos + cribHex.length,
    );

    return {
      position: this.selectedPosition,
      length: this.crib.length,
      keyHex: hexXor(cribHex, encryptedPart),
      keyText: hexToString(hexXor(cribHex, encryptedPart)),
    };
  });

  // ========================================================================
  // Methods
  // ========================================================================

  /**
   * Generates a unique ID for messages
   */
  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Adds a new encrypted message
   */
  addMessage(encrypted: string): Message | null {
    const normalized = encrypted.replace(/\s/g, "").toLowerCase();

    if (!isValidHex(normalized)) {
      return null;
    }

    // Don't add duplicates
    if (this.messages.some((m) => m.encrypted === normalized)) {
      return null;
    }

    const message: Message = {
      id: this.generateId(),
      encrypted: normalized,
      decrypted: "",
    };

    this.messages.push(message);

    // Set first message as active if none selected
    if (!this.activeMessageId) {
      this.activeMessageId = message.id;
    }

    return message;
  }

  /**
   * Removes a message by ID
   */
  removeMessage(id: string): boolean {
    const index = this.messages.findIndex((m) => m.id === id);
    if (index === -1) return false;

    this.messages.splice(index, 1);

    // Clear active message if it was removed
    if (this.activeMessageId === id) {
      this.activeMessageId =
        this.messages.length > 0 ? this.messages[0].id : null;
    }

    return true;
  }

  /**
   * Sets the crib (known/guessed plaintext)
   */
  setCrib(crib: string): void {
    this.crib = crib;
    this.selectedPosition = null;
  }

  /**
   * Sets the active message (the one the crib is being applied to)
   */
  setActiveMessage(id: string): void {
    if (this.messages.some((m) => m.id === id)) {
      this.activeMessageId = id;
      this.selectedPosition = null;
    }
  }

  /**
   * Selects a crib position and applies the decryption
   */
  selectPosition(position: number): void {
    if (position < 0) return;

    const result = this.cribResults.find((r) => r.position === position);
    if (!result) return;

    this.selectedPosition = position;

    // Update decrypted parts for each message
    result.decryptedParts.forEach((decrypted, index) => {
      if (index < this.messages.length) {
        const msg = this.messages[index];
        const pos = position * 2;
        const cribLen = this.crib.length;

        // Build the full decrypted string with the new part
        const before = msg.decrypted.substring(0, position);
        const after = msg.decrypted.substring(position + cribLen);

        // Pad with underscores if needed
        const paddedBefore = before.padEnd(position, "_");

        msg.decrypted = paddedBefore + decrypted + after;
      }
    });
  }

  /**
   * Updates the decrypted text for a specific message
   */
  updateDecrypted(id: string, decrypted: string): void {
    const msg = this.messages.find((m) => m.id === id);
    if (msg) {
      msg.decrypted = decrypted;
    }
  }

  /**
   * Clears all state
   */
  clear(): void {
    this.messages = [];
    this.crib = "";
    this.selectedPosition = null;
    this.activeMessageId = null;
  }

  /**
   * Resets decryption progress but keeps messages
   */
  resetDecryption(): void {
    this.crib = "";
    this.selectedPosition = null;
    for (const msg of this.messages) {
      msg.decrypted = "";
    }
  }

  /**
   * Exports the current state for saving/sharing
   */
  exportState(): {
    messages: Array<{ encrypted: string; decrypted: string }>;
    crib: string;
  } {
    return {
      messages: this.messages.map((m) => ({
        encrypted: m.encrypted,
        decrypted: m.decrypted,
      })),
      crib: this.crib,
    };
  }

  /**
   * Imports a previously saved state
   */
  importState(state: {
    messages: Array<{ encrypted: string; decrypted?: string }>;
    crib?: string;
  }): void {
    this.clear();

    for (const msg of state.messages) {
      const added = this.addMessage(msg.encrypted);
      if (added && msg.decrypted) {
        added.decrypted = msg.decrypted;
      }
    }

    if (state.crib) {
      this.crib = state.crib;
    }
  }
}

// ============================================================================
// Singleton instance for use in components
// ============================================================================

export const cribDrag = new CribDrag();
