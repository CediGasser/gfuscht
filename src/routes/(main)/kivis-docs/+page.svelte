<script lang="ts">
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

  import task_5 from './assets/interaction-of-color.png'

  import task_6 from './assets/visual-hierarchy.png'
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
      <div class="flex-row">
        <img src={task_1a1} alt="1-a-1" />
        <img src={task_1a2} alt="1-a-2" />
        <img src={task_1a3} alt="1-a-3" />
      </div>
      <h3>B</h3>
      <div class="flex-row">
        <img src={task_1b1} alt="1-b-1" />
        <img src={task_1b2} alt="1-b-2" />
        <img src={task_1b3} alt="1-b-3" />
      </div>
      <h3>C</h3>
      <div class="flex-row">
        <img src={task_1c1} alt="1-c-1" />
        <img src={task_1c2} alt="1-c-2" />
        <img src={task_1c3} alt="1-c-3" />
      </div>
      <h3>D</h3>
      <div class="flex-row">
        <img src={task_1d1} alt="1-d-1" />
        <img src={task_1d2} alt="1-d-2" />
        <img src={task_1d3} alt="1-d-3" />
      </div>
    </div>
  </section>
  <section class="task-2">
    <div class="container">
      <h2 class="title">Figur und Grund</h2>
      <img src={task_2} alt="figur und grund" />
    </div>
  </section>
  <section class="task-3">
    <div class="container">
      <h2 class="title">Schriftvergleich</h2>
      <img src={task_3} alt="Typographie Vergleich" />
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
      <img src={task_5} alt="Interaction of Color" class="bg-white p-2" />
    </div>
  </section>
  <section class="task-6">
    <div class="container">
      <h2 class="title">Hierarchie</h2>
      <img src={task_6} alt="Visual Hierarchy" class="bg-white" />
    </div>
  </section>
  <section class="task-7">
    <div class="container">
      <h2 class="title">Whitespace</h2>
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
    </div>
  </section>
  <section class="task-10">
    <div class="container">
      <h2 class="title">Layout</h2>
    </div>
  </section>
  <section class="task-11">
    <div class="container">
      <h2 class="title">Zeichnen</h2>
    </div>
  </section>
</main>

<style>
  main {
    width: 100%;
    min-height: 100vh;
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
</style>
