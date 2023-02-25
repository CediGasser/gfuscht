<script lang="ts">
  import Snippet from '$lib/components/Snippet.svelte';

  let code = `
    import { Snippet } from '$lib/components/Snippet.svelte';
    let code = \`<Snippet {code} />\`;
    document.body.innerHTML = code;
    do something(); 8====D
  `
</script>

<Snippet {code} animateGradient/>