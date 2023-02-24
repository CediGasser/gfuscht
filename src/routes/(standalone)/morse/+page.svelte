<script lang="ts">
  import { focusOnLoad } from '$lib/Utils'

  let morseInput = '';

  let morse = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    "'": '.----.',
    '!': '-.-.--',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '&': '.-...',
    ':': '---...',
    ';': '-.-.-.',
    '=': '-...-',
    '+': '.-.-.',
    '-': '-....-',
    '_': '..--.-',
    '"': '.-..-.',
    '$': '...-..-',
    '@': '.--.-.',
    ' ': '/',
  };

  $: morseOutput = morseInput
    .toLowerCase()
    .split(' ')
    .map(word => 
      word.split('')
      .map(char => morse[char] || char)
      .join(' '));
</script>

<div class="controls">
  <input use:focusOnLoad bind:value={morseInput} />
</div>

<div class="morse">
  {#each morseOutput as word}
    {#each word as char}
        <span class:dot={char === '.'} class:dash={char === '-'} class:space={char === ' '}></span>
    {/each}
    <br/>
  {/each}
</div>

<style>
  .morse {
    margin: 6rem;
    --size: 1.5rem;
  }

  .dot {
    display: inline-block;
    width: var(--size);
    height: var(--size);
    border-radius: calc(var(--size) / 2);
    background: black;
    margin-left: 0.1rem;
  }

  .dash {
    display: inline-block;
    width: calc(var(--size) * 3);
    height: var(--size);
    border-radius: calc(var(--size) / 2);
    background: black;
    margin-left: 0.1rem;
  }

  .space {
    display: inline-block;
    width: calc(var(--size) / 2);
    height: 0;
    margin: 0;
  }

  .controls {
    display: flex;
    justify-content: center;
  }

  input {
    display: inline;
    font-size: 2rem;
    padding: 1rem;
    margin: 2rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    width: 100%;
  }
</style>