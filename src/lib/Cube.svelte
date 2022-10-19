<script lang="ts">
	import { type Texture, CircleBufferGeometry, MeshStandardMaterial, BoxBufferGeometry, DoubleSide } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		HemisphereLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		useTexture
	} from '@threlte/core'
	import { spring } from 'svelte/motion'

	export let src: string = 'trump.png'
	const scale = spring(1)

	$: updateImage(src)

	let texture: Texture;
	const updateImage = async (imgSrc) => {
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
				on:pointerenter={() => ($scale = 2)}
				on:pointerleave={() => ($scale = 1)}
				position={{ y: 0.5 }}
				castShadow
				geometry={new BoxBufferGeometry(1, 1, 1)}
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
