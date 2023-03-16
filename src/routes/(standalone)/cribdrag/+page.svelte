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

<h1>Crib Drag</h1>
<pre>{$cribDrag.key}</pre>

{#each $cribDrag.messages as msg }
  <p>{msg.encrypted}</p>
  <input on:change={updateMessage(msg)} />
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

<style>
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
  }
  .playground div {
    margin-top: 4rem;
  }
</style>