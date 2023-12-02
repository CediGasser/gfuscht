import { writable } from "svelte/store";

export type Message = {
  encrypted: string;
  guess: string;
}

interface CribDragStore {
  messages: Message[];
  keyHex: string;
  key: string;
  possibleGuesses: string[][];
  guessIndex: number;
}

// 3b101c091d53320c000910
// 071d154502010a04000419

var decodeHexStringToByteArray = function (hexString: string) {
  var result = [];
  while (hexString.length >= 2) { 
      result.push(parseInt(hexString.substring(0, 2), 16));
      hexString = hexString.substring(2, hexString.length);
  }
  return result;
}

function hexToString(hex: string) {
  var string = '';
  for (var i = 0; i < hex.length; i += 2) {
    string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return string;
}

function stringToHex(string: string) {
  return string.split("").map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}

function toHexString(byteArray: number[]) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

function hexXor(a: string, b: string) {
  const aBytes = decodeHexStringToByteArray(a);
  const bBytes = decodeHexStringToByteArray(b);
  const result = [];
  for (let i = 0; i < aBytes.length; i++) {
    result.push(aBytes[i] ^ bBytes[i]);
  }
  return toHexString(result)
}

function createCribDrag() {
  const { subscribe, update, set } = writable<CribDragStore>({
    messages: [],
    keyHex: "",
    key: "",
    possibleGuesses: [],
    guessIndex: 0,
  });
  
  return {
    subscribe,
    update: (message: string, guess: string) => update((state) => {
      // hex of guess
      let guessHex = stringToHex(guess);
      

      state.possibleGuesses = [];
      for (let i = 0; i <= message.length - guessHex.length; i += 2) {
        const messageXorPart = message.slice(i, i + guessHex.length);
        const guessXor = hexXor(messageXorPart, guessHex);
        const guessesForThisIndex = state.messages.map((m) => {
          const guessingMessagePart = m.encrypted.slice(i, i + guessHex.length);
          const guessingMessageXor = hexXor(guessXor, guessingMessagePart);
          return hexToString(guessingMessageXor);
        });
        state.possibleGuesses.push(guessesForThisIndex);
      }

      let key = hexXor(message, guessHex);

      state.keyHex = key;
      state.key = hexToString(key);

      state.messages = state.messages.map((m) => {
        if (m.encrypted === message) {
          m.guess = guess;
        }
        return m;
      });

      if (state.possibleGuesses.length <= state.guessIndex) {
        state.possibleGuesses[state.guessIndex].forEach((guess, i) => {
          state.messages[i].guess = guess;
        });
      }

      return state;
    }),
    set,
    add: (message: string) => update((state) => {
      state.messages.push({ encrypted: message, guess: "" });
      return state;
    }),
    remove: (message: string) => update((state) => {
      state.messages = state.messages.filter((m) => m.encrypted !== message);
      return state;
    }),
    setGuessIndex: (index: number) => update((state) => {
      state.possibleGuesses[index].forEach((guess, i) => {
        state.messages[i].guess = guess;
      });
      state.guessIndex = index;
      return state;
    }),
    clear: () => set({ messages: [], keyHex: "", key: "", possibleGuesses: [], guessIndex: 0 })
  };
}

export const cribDrag = createCribDrag();

export { hexToString, hexXor, stringToHex, toHexString }