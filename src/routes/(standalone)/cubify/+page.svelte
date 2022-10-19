<script lang="ts">
	import Cube from '$lib/Cube.svelte'
	import ImageUpload from '$lib/ImageUpload.svelte'

	let imgSrc: string
</script>
	
<ImageUpload bind:dataUrl={imgSrc}/>

<Cube src={imgSrc}/>
