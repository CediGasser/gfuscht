<script lang="ts">
  import {
    cribDrag,
    type Message,
    hexXor,
    hexToString,
    stringToHex,
  } from '$lib/classes/CribDrag'
  import Seo from '$lib/components/Seo.svelte'
  let newMsg = $state('')

  const addMessage = () => {
    cribDrag.add(newMsg)
    newMsg = ''
  }

  const updateMessage = (msg: Message) => (e: Event) => {
    let input = e.target as HTMLInputElement
    cribDrag.update(msg.encrypted, input.value)
  }

  // playground stuff
  let xor1 = ''
  let xor2 = ''
  let xorRes = $derived(hexXor(xor1, xor2));

  let str = ''
  let strAsHex = $derived(stringToHex(str));
</script>

<Seo
  title="Crib Drag"
  description="WIP. A tool to help decrypt OTP messages using the crib dragging technique."
  keywords="otp, crib drag, decrypt, encryption, one time pad"
/>

<main>
  <h1>Crib Drag</h1>

  <section class="container">
    <h2>Your messages</h2>

    {#each $cribDrag.messages as msg}
      <p class="monospace">{msg.encrypted}</p>
      <input onkeyup={updateMessage(msg)} value={msg.guess} />
    {/each}

    <div class="addNewMessage">
      <label for="newMsg" hidden>Add new message</label>
      <input
        placeholder="New encrypted message"
        bind:value={newMsg}
        id="newMsg"
      />
      <button class="new-message" onclick={addMessage}>Add</button>
    </div>
  </section>

  <div class="container possible-guesses">
    <h2>Select what seems like decrypted parts:</h2>
    {#each $cribDrag.possibleGuesses as guesses, i}
      <button
        class="guess"
        onclick={() => cribDrag.setGuessIndex(i)}
        onkeyup={() => cribDrag.setGuessIndex(i)}
      >
        <ul>
          {#each guesses as guess}
            <li>{guess}</li>
          {/each}
        </ul>
      </button>
    {/each}
  </div>

  <div class="container">
    <h2>The resulting key:</h2>

    <pre class="monospace">{$cribDrag.keyHex}</pre>
    <pre>{$cribDrag.key}</pre>
  </div>
</main>

<style>
  main {
    height: 100vh;
    padding: 1rem;
    color: var(--theme-text);
    background-color: var(--theme-base);
  }

  .container {
    background-color: var(--theme-surface);
    border-radius: calc(var(--theme-radius) * 2);
    padding: 1rem;
    margin-block: 1rem;
  }

  input {
    background-color: var(--theme-overlay);
    border: 1px solid var(--theme-highlight-mid);
    border-radius: var(--theme-radius);
    color: var(--theme-text);
    padding-inline: 0.5rem;
  }

  pre {
    padding: 1rem;
    margin: 1rem;
  }

  button.new-message {
    background-color: var(--theme-primary);
    border: 1px solid var(--theme-highlight-mid);
    border-radius: var(--theme-radius);
    padding: 0.5rem;
    margin: 1rem;
    color: var(--theme-highlight-low);
    cursor: pointer;
  }

  button.guess {
    background-color: var(--theme-surface);
    border: 1px solid var(--theme-highlight-high);
    border-radius: var(--theme-radius);
    padding: 0.5rem;
    margin: 1rem;
    color: var(--theme-text);
    cursor: pointer;
  }

  button.guess:hover {
    background-color: var(--theme-highlight-mid);
    transition: transform 0.2s ease;
    transform: scale(1.05);
  }

  .monospace {
    font-family: var(--theme-font-mono);
  }

  .possible-guesses {
    display: flex;
    flex-wrap: wrap;
  }
  .possible-guesses ul {
    padding: 0;
    list-style: none;
  }

  .addNewMessage {
    margin: 1rem 0;
  }
</style>
