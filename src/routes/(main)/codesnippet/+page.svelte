<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
  import Snippet from '$lib/components/Snippet.svelte'

  let code = `import { Snippet } from '$lib/components/Snippet.svelte';

let code = \`<Snippet {code} />\`;

window.addEventListener('mousemove', (e) => {
  let offset = div.getBoundingClientRect();
  let dx = e.clientX - offset.left - offset.width / 2;
  let dy = e.clientY - offset.top - offset.height / 2;

  rotateX.set(dy / -100);
  rotateY.set(dx / 100);
});

function doSomething() {
  console.log('Hello world!');
}

doSomething();`
</script>

<Seo
  title="Code Snippet"
  description="Using CSS perspective and mouse tracking to create a 3D effect on a code snippet."
  keywords="css, perspective, 3d, effect, code, snippet"
/>

<div class="wrapper">
  <Snippet {code} animateGradient />
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
  }
</style>
