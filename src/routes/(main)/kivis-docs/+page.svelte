<script lang="ts">
  import Lightbox from './Lightbox.svelte'
  import { LetterDecrypt } from '../letterDecryptAnimation/Decrypt.svelte'

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

  import task_4_b1 from './assets/schriftsatz-before-1.jpeg'
  import task_4_b2 from './assets/schriftsatz-before-2.jpeg'
  import task_4_b3 from './assets/schriftsatz-before-3.jpeg'
  import task_4_a1 from './assets/schriftsatz-after-1.jpeg'
  import task_4_a2 from './assets/schriftsatz-after-2.jpeg'
  import task_4_a3 from './assets/schriftsatz-after-3.jpeg'

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
  import SwitcherBox from './SwitcherBox.svelte'

  let title = new LetterDecrypt('', { duration: 2000 })
  title.target = 'KiVis'
</script>

<main>
  <nav>
    <h3>Inhalt</h3>
    <ul>
      <li>
        <a href="#task-1">Position der Formen</a>
      </li>
      <li>
        <a href="#task-2">Figur und Grund</a>
      </li>
      <li>
        <a href="#task-3">Schriftvergleich</a>
      </li>
      <li>
        <a href="#task-4">Schriftsatz</a>
      </li>
      <li>
        <a href="#task-5">Interaktion von Farben</a>
      </li>
      <li>
        <a href="#task-6">Hierarchie</a>
      </li>
      <li>
        <a href="#task-7">Whitespace</a>
      </li>
      <li>
        <a href="#task-8">Dramaturgie</a>
      </li>
      <li>
        <a href="#task-9">Bildbetrachtung</a>
      </li>
      <li>
        <a href="#task-10">Layout</a>
      </li>
      <li>
        <a href="#task-11">Zeichnen</a>
      </li>
    </ul>
  </nav>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <section
    class="hero"
    id="hero"
    onmouseenter={() => (title.target = 'Kickstart<br> Visual Design')}
    onmouseleave={() => (title.target = 'KiVis')}
  >
    <h1 class="title">{@html title.current}</h1>
  </section>
  <section class="task-1" id="task-1">
    <h2 class="title">Position der Formen</h2>
    <div class="flex-row task-1-column-labels">
      <span>Nah</span>
      <span>---></span>
      <span>Fern</span>
    </div>
    <div class="task-1-rows">
      <Lightbox>
        <div class="flex-row gap-1">
          <img src={task_1a1} alt="1-a-1" />
          <img src={task_1a2} alt="1-a-2" />
          <img src={task_1a3} alt="1-a-3" />
        </div>
      </Lightbox>
      <Lightbox>
        <div class="flex-row gap-1">
          <img src={task_1b1} alt="1-b-1" />
          <img src={task_1b2} alt="1-b-2" />
          <img src={task_1b3} alt="1-b-3" />
        </div>
      </Lightbox>
      <Lightbox>
        <div class="flex-row gap-1">
          <img src={task_1c1} alt="1-c-1" />
          <img src={task_1c2} alt="1-c-2" />
          <img src={task_1c3} alt="1-c-3" />
        </div>
      </Lightbox>
      <Lightbox>
        <div class="flex-row gap-1">
          <img src={task_1d1} alt="1-d-1" />
          <img src={task_1d2} alt="1-d-2" />
          <img src={task_1d3} alt="1-d-3" />
        </div>
      </Lightbox>
    </div>
  </section>
  <section class="task-2" id="task-2">
    <div class="container">
      <h2 class="title">Figur und Grund</h2>
      <Lightbox>
        <img src={task_2} alt="figur und grund" />
      </Lightbox>
    </div>
  </section>
  <section class="task-3" id="task-3">
    <div class="container">
      <h2 class="title">Schriftvergleich</h2>
      <Lightbox>
        <img src={task_3} alt="Typographie Vergleich" />
      </Lightbox>
    </div>
  </section>
  <section class="task-4" id="task-4">
    <div class="container">
      <h2 class="title">Schriftsatz</h2>
      <SwitcherBox>
        {#snippet before()}
          <Lightbox>
            <img
              src={task_4_b1}
              alt="Schriftsatz 1 vorher"
              class="bg-white p-2"
            />
          </Lightbox>
          <Lightbox>
            <img
              src={task_4_b2}
              alt="Schriftsatz 2 vorher"
              class="bg-white p-2"
            />
          </Lightbox>
          <Lightbox>
            <img
              src={task_4_b3}
              alt="Schriftsatz 3 vorher"
              class="bg-white p-2"
            />
          </Lightbox>
        {/snippet}
        {#snippet after()}
          <Lightbox>
            <img
              src={task_4_a1}
              alt="Schriftsatz 1 nachher"
              class="bg-white p-2"
            />
          </Lightbox>
          <Lightbox>
            <img
              src={task_4_a2}
              alt="Schriftsatz 2 nachher"
              class="bg-white p-2"
            />
          </Lightbox>
          <Lightbox>
            <img
              src={task_4_a3}
              alt="Schriftsatz 3 nachher"
              class="bg-white p-2"
            />
          </Lightbox>
        {/snippet}
      </SwitcherBox>
    </div>
  </section>
  <section class="task-5" id="task-5">
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
  <section class="task-6" id="task-6">
    <div class="container">
      <h2 class="title">Hierarchie</h2>
      <Lightbox>
        <img src={task_6} alt="Visual Hierarchy" />
      </Lightbox>
    </div>
  </section>
  <section class="task-7" id="task-7">
    <div class="container">
      <h2 class="title">Whitespace</h2>
      <Lightbox>
        <img src={task_7} alt="Whitespace" />
      </Lightbox>
    </div>
  </section>
  <section class="task-8" id="task-8">
    <div class="container">
      <h2 class="title">Dramaturgie</h2>
    </div>
  </section>
  <section class="task-9" id="task-9">
    <h2 class="title">Bildbetrachtung</h2>
    <div class="flex-row my-2 gap-1 bildbetrachtung">
      <Lightbox>
        <img src={task_9_1} alt="Ottojaja" />
      </Lightbox>
      <Lightbox>
        <img src={task_9_2} alt="Festival des Arts" />
      </Lightbox>
    </div>
  </section>
  <section class="task-10" id="task-10">
    <div class="container">
      <h2 class="title">Layout</h2>
    </div>
  </section>
  <section class="task-11" id="task-11">
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
    <div class="flex-row gap-1 my-2">
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

  nav {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--theme-base);
    z-index: 1;
    padding: 1rem;
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

  a {
    scroll-behavior: smooth;
  }

  a,
  p,
  span {
    font-size: 2rem;
    font-weight: 400;
  }

  .hero {
    height: 20rem;
  }

  .hero h1 {
    text-wrap: pretty;
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

  .task-1-rows {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .task-1-column-labels {
    justify-content: space-between;
  }

  .task-1-column-labels span {
    width: 30%;
    text-align: center;
  }

  .bg-white {
    background-color: white;
  }

  .p-2 {
    padding: 2rem;
  }

  .my-2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .gap-1 {
    gap: 1rem;
  }
</style>
