<script lang="ts">
  import { focusOnLoad } from '$lib/actions'
  import { fade } from 'svelte/transition'

  let morseInput = '';

  let morse: Record<string, string> = {
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
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
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
    ' ': ' ',
  };

  $: morseOutput = morseInput
    .toLowerCase()
    .split(' ')
    .map(word => 
      word.split('')
      .map(char => morse[char] || ' ')
      .join(' '));
</script>

<main>
  <div class="controls">
    <input use:focusOnLoad bind:value={morseInput} />
  </div>
  
  <div class="morse">
    {#each morseOutput as word}
      {#each word as char}
        <span 
          transition:fade 
          class:dot={char === '.'} 
          class:dash={char === '-'} 
          class:space={char === ' '}>
        </span>
      {/each}
      <br/>
    {/each}
  </div>
</main>

<style>
  main {
    height: 100vh;
  }

  .morse {
    margin: 6rem;
    --size: 1.5rem;
  }

  @media (max-width: 480px) {
		.morse {
		  margin: 2rem;
      --size: .5rem;
		}
	}

  span {
    background-color: var(--theme-primary);
    border-radius: calc(var(--size) / 2);
  }

  .dot {
    display: inline-block;
    width: var(--size);
    height: var(--size);
    margin-right: 0.1rem;
  }

  .dash {
    display: inline-block;
    width: calc(var(--size) * 3);
    height: var(--size);
    margin-right: 0.1rem;
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
    color: var(--theme-text);
    display: inline;
    font-size: 2rem;
    padding: 1rem;
    margin: 2rem;
    border: 1px solid var(--theme-highlight-mid);
    border-radius: var(--theme-radius);
    width: 100%;
    background-color: var(--theme-overlay);
  }
</style>