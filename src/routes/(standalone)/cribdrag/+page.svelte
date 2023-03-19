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
  <pre>{$cribDrag.key}</pre>

  {#each $cribDrag.messages as msg }
    <p>{msg.encrypted}</p>
    <input on:keyup={updateMessage(msg)} />
  {/each}

  <div class="addNewMessage">
    <label for="newMsg">Add new message</label>
    <input bind:value={newMsg} id="newMsg" />
    <button on:click={addMessage}>Add</button>
  </div>

  <div class="possible-guesses">
    {#each $cribDrag.possibleGuesses as guesses }
      <ul>
        {#each guesses as guess }
          <li>{guess}</li>
        {/each}
      </ul>
    {/each}
  </div>

  <div class="playground">
    <div class="xor">
      <label for="xor">XOR</label>
      <input bind:value={xor1} id="xor" />
      <input bind:value={xor2} id="xor" />
      <p>Hex: <span>{xorRes}</span></p>
      <p>Str: <span>{hexToString(xorRes)}</span></p>
    </div>
    <div class="toHex">
      <input bind:value={str}/>
      <p>Hex: {strAsHex}</p>
    </div>
  </div>
</main>

<style>
  main {
    height: max(100vh, 100%);
    background-color: black;
    color: white;
    padding: 1rem;
  }

  input {
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: .5rem;
  }

  pre {
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: .5rem;
    padding: 1rem;
    margin: 1rem;
  }

  button {
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: .5rem;
    padding: .5rem;
    margin: 1rem;
  }

  .possible-guesses {
    display: flex;
    flex-wrap: wrap;
  }
  .possible-guesses ul {
    margin: 1rem;
    padding: 0;
    list-style: none;
  }
  .addNewMessage {
    margin: 1rem 0;
  }
  .playground {
    margin: 4rem;
    border: 1px solid white;
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 4rem;
  }
  .toHex {
    margin-top: 1rem;
  }
</style>