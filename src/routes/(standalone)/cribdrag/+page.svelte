<script lang="ts">
  import { cribDrag, type Message } from "$lib/classes/CribDrag";
  let newMsg = "";

  const addMessage = () => {
    cribDrag.add(newMsg);
    newMsg = "";
  };

  const updateMessage = (msg: Message) => (e) => {
    cribDrag.update(msg.encrypted, e.target.value);
  };
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
</style>