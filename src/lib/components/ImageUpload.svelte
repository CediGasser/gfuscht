<script lang="ts">
    	export let dataUrl: string;
	
	const onUpload = (event: Event) => {
        	const target = event.target as HTMLInputElement;
        	const files = target.files as FileList;
        	let image = files[0];
        	let reader = new FileReader();
        	reader.readAsDataURL(image);
        	reader.onload = e => {
            		dataUrl = e?.target?.result as string
        	};
	}
</script>

<input type="file" accept=".jpg, .jpeg, .png" on:change={onUpload}/>
