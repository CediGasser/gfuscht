<script lang="ts">
  import { cribDrag, type Message, hexXor, hexToString, stringToHex } from "$lib/classes/CribDrag";
  let newMsg = "";

  const addMessage = () => {
    cribDrag.add(newMsg);
    newMsg = "";
  };

  const updateMessage = (msg: Message) => (e: Event) => {
    let input = e.target as HTMLInputElement
    cribDrag.update(msg.encrypted, input.value);
  };

  // playground stuff
  let xor1 = ''
  let xor2 = ''
  $: xorRes = hexXor(xor1, xor2)

  let str = ''
  $: strAsHex = stringToHex(str)
</script>
<main>
  <h1>Crib Drag</h1>

  <section class="container">
    <h2>Your messages</h2>

    {#each $cribDrag.messages as msg }
    <p class="monospace">{msg.encrypted}</p>
    <input on:keyup={updateMessage(msg)} value={msg.guess} />
    {/each}
    
    <div class="addNewMessage">
      <label for="newMsg" hidden>Add new message</label>
      <input placeholder="New encrypted message" bind:value={newMsg} id="newMsg" />
      <button on:click={addMessage}>Add</button>
    </div>
  </section>

  <div class="container possible-guesses">
    <h2>Select what seems like decrypted parts:</h2>
    {#each $cribDrag.possibleGuesses as guesses, i }
      <ul 
        on:click={() => cribDrag.setGuessIndex(i)}
        on:keyup={() => cribDrag.setGuessIndex(i)}>
        {#each guesses as guess }
          <li>{guess}</li>
        {/each}
      </ul>
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
    height: max(100vh, 100%);
    padding: 1rem;
    color: var(--theme-text);
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

  button {
    background-color: var(--theme-primary);
    border: 1px solid var(--theme-highlight-mid);
    border-radius: var(--theme-radius);
    padding: .5rem;
    margin: 1rem;
    color: var(--theme-highlight-low);
    cursor: pointer;
  }

  .monospace {
    font-family: var(--font-mono);
  }

  .possible-guesses {
    display: flex;
    flex-wrap: wrap;
  }
  .possible-guesses ul {
    margin: 1rem;
    padding: 0;
    list-style: none;
    cursor: pointer;
    border: 1px solid var(--theme-highlight-high);
    border-radius: 1rem;
    padding: 1rem;
    background-color: var(--theme-surface);
  }

  .possible-guesses ul:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: transform 0.2s ease;
    transform: scale(1.02);
  }

  .addNewMessage {
    margin: 1rem 0;
  }
</style>