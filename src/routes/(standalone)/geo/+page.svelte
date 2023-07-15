<script lang="ts">
  export let data;

  const registerGeoHandler = () => {
    navigator.registerProtocolHandler(
      'geo',
      'geo?q=%s'
    );
  };

</script>

<h1><pre>geo:</pre> links can be handled by this site.</h1>
<button on:click={registerGeoHandler}>Yes please</button>

<div class="results">
  <h2>Results</h2>
  <pre>{JSON.stringify(data, null, 2)}</pre>
</div>

<style>
  h1 {
    text-align: center;
  }

  pre {
    display: inline;
  }

  button {
    display: block;
    margin: 0 auto;
    padding: 1em;
    font-size: 1.5em;
    border-radius: 0.5em;
    border: 0;
    background: rgb(220, 113, 43);
    color: white;
    cursor: pointer;
  }
</style>