<script lang="ts">
  import Lightbox from './Lightbox.svelte'

  import task_1a1 from './assets/1-a-1.png'
  import task_1a2 from './assets/1-a-2.png'
  import task_1a3 from './assets/1-a-3.png'
  import task_1b1 from './assets/1-b-1.png'
  import task_1b2 from './assets/1-b-2.png'
  import task_1b3 from './assets/1-b-3.png'
  import task_1c1 from './assets/1-c-1.png'
  import task_1c2 from './assets/1-c-2.png'
  import task_1c3 from './assets/1-c-3.png'
  import task_1d1 from './assets/1-d-1.png'
  import task_1d2 from './assets/1-d-2.png'
  import task_1d3 from './assets/1-d-3.png'

  import task_2 from './assets/figur-und-grund.png'

  import task_3 from './assets/Typography-Comparison.png'

  // TODO: Add task 4

  import task_5_1 from './assets/interaction-of-color-1.png'
  import task_5_2 from './assets/interaction-of-color-2.png'
  import task_5_3 from './assets/interaction-of-color-3.png'

  import task_6 from './assets/visual-hierarchy.png'

  import task_7 from './assets/whitespace.png'

  // TODO: Add task 8

  import task_9_1 from './assets/ottojaja.jpg'
  import task_9_2 from './assets/festival-des-arts.jpg'

  // TODO: Add task 10

  import task_11_1 from './assets/drawings/1-hand.jpeg'
  import task_11_2 from './assets/drawings/2-perspektive.jpeg'
  import task_11_3 from './assets/drawings/3-kopf.png'
  import task_11_4 from './assets/drawings/4-figur.jpeg'
  import task_11_5_1 from './assets/drawings/5-1.jpeg'
  import task_11_5_2 from './assets/drawings/5-2.jpeg'
  import task_11_5_3 from './assets/drawings/5-3.jpeg'
  import task_11_5_4 from './assets/drawings/5-4.jpeg'
  import task_11_5_5 from './assets/drawings/5-5.jpeg'
  import ListColumn from '../clock/ListColumn.svelte'
  import Layout from '../+layout.svelte'
</script>

<main>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">KiVis</h1>
      </div>
    </div>
  </section>
  <section class="task-1">
    <h2 class="title">Position der Formen</h2>
    <div class="tasks">
      <h3>A</h3>
      <Lightbox>
        <div class="flex-row">
          <img src={task_1a1} alt="1-a-1" />
          <img src={task_1a2} alt="1-a-2" />
          <img src={task_1a3} alt="1-a-3" />
        </div>
      </Lightbox>
      <h3>B</h3>
      <Lightbox>
        <div class="flex-row">
          <img src={task_1b1} alt="1-b-1" />
          <img src={task_1b2} alt="1-b-2" />
          <img src={task_1b3} alt="1-b-3" />
        </div>
      </Lightbox>
      <h3>C</h3>
      <Lightbox>
        <div class="flex-row">
          <img src={task_1c1} alt="1-c-1" />
          <img src={task_1c2} alt="1-c-2" />
          <img src={task_1c3} alt="1-c-3" />
        </div>
      </Lightbox>
      <h3>D</h3>
      <Lightbox>
        <div class="flex-row">
          <img src={task_1d1} alt="1-d-1" />
          <img src={task_1d2} alt="1-d-2" />
          <img src={task_1d3} alt="1-d-3" />
        </div>
      </Lightbox>
    </div>
  </section>
  <section class="task-2">
    <div class="container">
      <h2 class="title">Figur und Grund</h2>
      <Lightbox>
        <img src={task_2} alt="figur und grund" />
      </Lightbox>
    </div>
  </section>
  <section class="task-3">
    <div class="container">
      <h2 class="title">Schriftvergleich</h2>
      <Lightbox>
        <img src={task_3} alt="Typographie Vergleich" />
      </Lightbox>
    </div>
  </section>
  <section class="task-4">
    <div class="container">
      <h2 class="title">Schriftsatz</h2>
    </div>
  </section>
  <section class="task-5">
    <div class="container">
      <h2 class="title">Interaktion von Farben</h2>
      <Lightbox>
        <img
          src={task_5_1}
          alt="Interaction of Color 1"
          class="bg-white p-2 my-2"
        />
      </Lightbox>
      <Lightbox>
        <img
          src={task_5_2}
          alt="Interaction of Color 2"
          class="bg-white p-2 my-2"
        />
      </Lightbox>
      <Lightbox>
        <img
          src={task_5_3}
          alt="Interaction of Color 3"
          class="bg-white p-2 my-2"
        />
      </Lightbox>
    </div>
  </section>
  <section class="task-6">
    <div class="container">
      <h2 class="title">Hierarchie</h2>
      <Lightbox>
        <img src={task_6} alt="Visual Hierarchy" />
      </Lightbox>
    </div>
  </section>
  <section class="task-7">
    <div class="container">
      <h2 class="title">Whitespace</h2>
      <Lightbox>
        <img src={task_7} alt="Whitespace" />
      </Lightbox>
    </div>
  </section>
  <section class="task-8">
    <div class="container">
      <h2 class="title">Dramaturgie</h2>
    </div>
  </section>
  <section class="task-9">
    <div class="container">
      <h2 class="title">Bildbetrachtung</h2>
      <Lightbox>
        <img src={task_9_1} alt="Ottojaja" class="my-2" />
      </Lightbox>
      <Lightbox>
        <img src={task_9_2} alt="Festival des Arts" class="my-2" />
      </Lightbox>
    </div>
  </section>
  <section class="task-10">
    <div class="container">
      <h2 class="title">Layout</h2>
    </div>
  </section>
  <section class="task-11">
    <h2 class="title">Zeichnen</h2>
    <Lightbox>
      <img src={task_11_1} alt="Hand" class="bg-white my-2" />
    </Lightbox>
    <Lightbox>
      <img src={task_11_2} alt="Perspektive" class="bg-white my-2" />
    </Lightbox>
    <Lightbox>
      <img src={task_11_3} alt="Kopf" class="bg-white my-2" />
    </Lightbox>
    <Lightbox>
      <img src={task_11_4} alt="Figur" class="bg-white my-2" />
    </Lightbox>
    <div class="flex-row drawings my-2">
      <Lightbox>
        <img src={task_11_5_1} alt="5-1" />
      </Lightbox>
      <Lightbox>
        <img src={task_11_5_2} alt="5-2" />
      </Lightbox>
      <Lightbox>
        <img src={task_11_5_3} alt="5-3" />
      </Lightbox>
      <Lightbox>
        <img src={task_11_5_4} alt="5-4" />
      </Lightbox>
      <Lightbox>
        <img src={task_11_5_5} alt="5-5" />
      </Lightbox>
    </div>
  </section>
</main>

<style>
  main {
    width: 100%;
    min-height: 100vh;
  }

  img {
    object-fit: contain;
  }

  section {
    padding: 2rem;
    margin: 0 auto;
    max-width: 800px;
  }

  h1 {
    font-size: 6rem;
    font-weight: 700;
  }

  h2 {
    font-size: 4rem;
    font-weight: 700;
  }

  h3 {
    font-size: 3rem;
    font-weight: 700;
  }

  p {
    font-size: 2rem;
    font-weight: 400;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .task-1 img {
    width: 30%;
  }

  .bg-white {
    background-color: white;
  }

  .p-2 {
    padding: 2rem;
  }

  .m-2 {
    margin: 2rem;
  }

  .my-2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .drawings img {
  }

  .drawings {
    gap: 1rem;
  }
</style>
