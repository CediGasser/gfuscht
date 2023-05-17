<script lang="ts">
  import norway from '$lib/assets/images/norway.jpeg'
</script>

<main>
  <h1>Sup wie gahds?</h1>
  
  <div class="shader">
    <img src={norway} alt="Asakusa at dusk">
    <div class="shader__layer specular">
      <div class="shader__layer mask"></div>
    </div>
  </div>
  <a href="https://www.instagram.com/balinfilms" class="img-attrib">&copy Balin</a>

</main>

<style>
  main {
    display: flex;
    align-items: center;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    flex-direction: column;
    padding-bottom: 80vh;
  }

  h1 {
    margin-block: 40vh;
    font-weight: 400;
    font-size: 2.4rem;
  }

  .img-attrib {
    text-decoration: none;
    color:rgba(0, 0, 0, 0.7);
    width: 100%;
    text-align: end;
    padding-inline: 0.5rem;
  }

  .shader {
    position: relative;
    overflow: hidden;
    backface-visibility: hidden; /* to force GPU performance */
  }

  .shader__layer {
    background: black;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-position: center;
  }

  .specular {
    mix-blend-mode: color-dodge;
    background-attachment: fixed;
    background-image: linear-gradient(170deg, black 20%, #3c5e6d 35%, #f4310e, #f58308 55%, black);
  }

  .mask {
    mix-blend-mode: multiply;
    background-image: url($lib/assets/images/norway_spec2.jpg);
  }
</style>