<script lang="ts">
    import {
        Canvas
    } from '@threlte/core'
    import Scene from './Scene.svelte'

    let height;
    let width;
</script>

<div bind:clientHeight={height} bind:clientWidth={width} class="background-div">
    <Canvas size={{width, height}}>
        <Scene />
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