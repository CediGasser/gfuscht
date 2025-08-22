<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
  import InputButtonField from './InputButtonField.svelte'
</script>

<Seo
  title="Aarons tool"
  description="Copy text to the clipboard with a button click. Why? Because we can. And because it's faster than selcting text and Ctrl+C."
  keywords="copy, clipboard, text, button, faster"
/>

<h1>Ctrl + C... V2</h1>
<InputButtonField />
<InputButtonField />

<svelte:head>
  <style>
    html {
      background: radial-gradient(
        circle at bottom right,
        #42275a 0,
        #734b6d 100%
      );
      height: 100vh;
    }
  </style>
</svelte:head>

<style>
  h1 {
    font-family: 'Courier New', Courier, monospace;
    color: rgb(236, 232, 252);
    padding: 1rem;
  }
</style>
