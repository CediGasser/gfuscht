<script lang="ts">
    import { tweened } from 'svelte/motion'
    import {
        Canvas,
        PerspectiveCamera,
        OrbitControls,
        DirectionalLight,
        PointLight,
        AmbientLight,
        Group,
        Object3DInstance
    } from '@threlte/core'
    import { useGltf } from '@threlte/extras'
    import fileUrl from '$lib/assets/Pencil.glb?url'

    let float = tweened(1)

    let height;
    let width;

    const LIGHTS_COUNT = 22
    const LIGHTS_SPACE = 22 * .2 / LIGHTS_COUNT
    const LIGHTS_RADIUS = .4

    const { gltf } = useGltf(fileUrl)

    $: if ($gltf?.nodes['Tinkercad_GLTF_Scene']) {
        $gltf?.nodes['Tinkercad_GLTF_Scene'].children[0].children[0].geometry.center()
    }

    let pointLights = Array(LIGHTS_COUNT).fill('').map((_, i) => {
        let angle = (Math.random() * 2 - 1 ) * Math.PI * 2;
        return {
            position: {
                x: Math.cos(angle) * LIGHTS_RADIUS,
                y: i * LIGHTS_SPACE,
                z: Math.sin(angle) * LIGHTS_RADIUS,
            },
            color: Math.random() * 0xFFFFFF
        }
    })

    const scroll = (e: Event) => {
        let shift = window.scrollY / 300
        pointLights.forEach((p, i) => {
            p.position.y = i * .2 + shift
            if (p.position.y > LIGHTS_COUNT * .2) {
                p.position.y %= LIGHTS_COUNT * LIGHTS_SPACE
            }
        })
        pointLights = pointLights
    }
</script>

<svelte:window on:scroll={scroll}/>
<div bind:clientHeight={height} bind:clientWidth={width} class="background-div">
    <Canvas size={{width, height}}>
        <PerspectiveCamera position={{ x:10, y: 10, z: 10 }} fov={24}>
            <OrbitControls
                autoRotate
                autoRotateSpeed={1}
                enableDamping
                enableZoom={true}
            />
        </PerspectiveCamera>

        <DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} intensity={0.1} />
        <DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.1} />
        <AmbientLight intensity={0.1} />

        <Group position={{y: -2}}>
            {#each pointLights as light}
                <PointLight {...light}/>
            {/each}
        </Group>

        <!-- Pen -->
        <Group scale={$float} on:click={() => ($float = 3)}>
            {#if $gltf}
                <Object3DInstance 
                    object={$gltf?.nodes['Tinkercad_GLTF_Scene'].children[0]} 
                    scale={0.03} 
                    castShadow 
                    receiveShadow />
            {/if}    
        </Group>
    </Canvas>
</div>

<main class="main-content">
    <div>
        <h1>Lorem ipsum dolor sit</h1>
    </div>
    <div>
        <h2>Vero consequuntur</h2
>
        <p>Necessitatibus quaerat porro laudantium tempora ad fuga illum, soluta dolorem distinctio dignissimos voluptates odio nemo non pariatur quo qui sint alias veritatis quas iste officiis numquam, quam culpa.</p>
    </div>
    <div>
        <h2>Nisi asperiores suscipit</h2
>
        <p>Eligendi asperiores nihil sequi quas itaque sapiente optio, maxime illum laudantium quidem nostrum harum quo inventore sit minima. Earum, officia? Voluptatem, aspernatur pariatur delectus tempore perspiciatis vitae laboriosam deserunt inventore consequuntur</p>
    </div>
    <div>
        <h2>Illum aspernatur</h2
>
        <p>Iste, debitis doloribus. Vel officiis quae doloremque laudantium quis voluptate. Velit </p>
    </div>
    <div>
        <h2>Voluptatem quidem sunt</h2
>
        <p>Explicabo ab ducimus quaerat consequuntur expedita? Culpa obcaecati corporis animi </p>
    </div>
</main>

<style>
    * {
        color: white;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 3rem;
    }
    .main-content {
        margin: 0;
        height: 100vh;
        padding-top: 10rem;
    }

    h1 {
        text-align: center;
    }

    .background-div {
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: -1;
        background-color: black;
    }

    main > div {
        width: min(800px, 100%);
        margin: auto;
        height: 100vh;
    }
</style>