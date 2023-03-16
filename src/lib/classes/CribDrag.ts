import { writable } from "svelte/store";

export type Message = {
  encrypted: string;
  guess: string;
}

interface CribDragStore {
  messages: Message[];
  key: string;
  possibleGuesses: string[][];
}

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
    key: "",
    possibleGuesses: []
  });
  
  return {
    subscribe,
    update: (message: string, guess: string) => update((state) => {
      let messagesXor = state.messages.map(m => m.encrypted).reduce((acc, m) => {
        return hexXor(acc, m);
      });
      let guessHex = guess.split("").map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");

      state.possibleGuesses = [];

      console.table({messagesXor, guessHex, guess})

      // calculate xor of the guessHex with every possible position in the messageXor
      // then xor that with every encrypted message to get the possible guesses
      for (let i = 0; i <= messagesXor.length - guessHex.length; i++) {
        const guessXor = hexXor(messagesXor.slice(i, guessHex.length), guessHex);
        console.log(guessXor)
        const possibleGuesses = state.messages.map((m) => {
          return hexToString(hexXor(m.encrypted, guessXor));
        });
        state.possibleGuesses.push(possibleGuesses);
        guessHex = '0' + guessHex;
      }

      let key = hexXor(messagesXor, guessHex)

      state.key = key + ' - ' + hexToString(key);

      state.messages = state.messages.map((m) => {
        if (m.encrypted === message) {
          m.guess = guess;
        }
        return m;
      });
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
    clear: () => set({ messages: [], key: "", possibleGuesses: [] })
  };
}

export const cribDrag = createCribDrag();