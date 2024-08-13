<script lang="ts">
  import Definition from '$lib/components/Definition.svelte'
  import Seo from '$lib/components/Seo.svelte'
</script>

<Seo
  title="Define"
  description="Create your own dictionary Definition Card"
  keywords="dictionary, card"
/>

<section>
  <Definition
    definition="This can be customized. Edit any text here."
    editable
  />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100vh;
  }
</style>
