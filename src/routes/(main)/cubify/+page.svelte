<script lang="ts">
	import Cube from '$lib/components/Cube.svelte'
	import ImageUpload from '$lib/components/ImageUpload.svelte'

	let imgSrc: string
</script>
	
<ImageUpload bind:dataUrl={imgSrc}/>

<Cube src={imgSrc}/>
