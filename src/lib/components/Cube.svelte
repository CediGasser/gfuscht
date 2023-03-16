<script lang="ts">
	import { type Texture, MeshStandardMaterial, BoxGeometry } from 'three'
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		useTexture
	} from '@threlte/core'
	import { spring } from 'svelte/motion'

	export let src: string = 'trump.png'
	const scale = spring(1)

	function debounce<T extends Function>(cb: T, wait = 20) {
		let h: number | null = null;
		let callable = (...args: any) => {
			if (h) clearTimeout(h);
			console.log('cleare timeout')
			h = setTimeout(() => {
				cb(...args)
				console.log('executed Fn')
			}, wait);
		};
		return <T>(<any>callable);
	}

	const resetScale = debounce(function () {$scale = 1}, 100);

	const makeBigger = () => {
		$scale += .1
		resetScale()
	}

	$: updateImage(src)

	let texture: Texture;
	const updateImage = async (imgSrc: string) => {
		texture = useTexture(imgSrc)
	}
</script>

<div>
	<Canvas>
		<PerspectiveCamera position={{ x:10, y: 10, z: 10 }} fov={24}>
			<OrbitControls
				autoRotate
				autoRotateSpeed={1}
				enableDamping
				enableZoom={false}
				target={{ y:0.5 }}
			/>
		</PerspectiveCamera>
 
		<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
		<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
		<AmbientLight intensity={0.2} />

		<!-- Cube -->
		<Group scale={$scale}>
			<Mesh
				interactive
				on:click={makeBigger}
				position={{ y: 0.5 }}
				castShadow
				geometry={new BoxGeometry(1, 1, 1)}
				material={new MeshStandardMaterial({ color: '#ffffff', map: texture})}
			/>
		</Group>		
	</Canvas>
</div>

<style>
	div {
		height: 100vh;
		width: 100%;
	}
</style>
