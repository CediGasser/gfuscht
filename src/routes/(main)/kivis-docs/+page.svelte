<script lang="ts">
  import Lightbox from './Lightbox.svelte'
  import ImageFlipbook from './ImageFlipbook.svelte'
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

  import task_7_1 from './assets/whitespace.png'
  import task_7_2 from './assets/whitespace-2.png'

  import task_8_0 from './assets/dramaturgie/dramaturgie-0.jpg'
  import task_8_1 from './assets/dramaturgie/dramaturgie-1.jpg'
  import task_8_2 from './assets/dramaturgie/dramaturgie-2.jpg'
  import task_8_3 from './assets/dramaturgie/dramaturgie-3.jpg'
  import task_8_4 from './assets/dramaturgie/dramaturgie-4.jpg'
  import task_8_5 from './assets/dramaturgie/dramaturgie-5.jpg'
  import task_8_6 from './assets/dramaturgie/dramaturgie-6.jpg'
  import task_8_7 from './assets/dramaturgie/dramaturgie-7.jpg'

  import task_9_1 from './assets/ottojaja.jpg'
  import task_9_2 from './assets/festival-des-arts.jpg'

  import task_10_0 from './assets/bourbaki/bourbaki-0.png'
  import task_10_1 from './assets/bourbaki/bourbaki-1.jpeg'
  import task_10_2 from './assets/bourbaki/bourbaki-2.jpeg'
  import task_10_3 from './assets/bourbaki/bourbaki-3.jpeg'
  import task_10_4 from './assets/bourbaki/bourbaki-4.jpeg'
  import task_10_5 from './assets/bourbaki/bourbaki-5.jpeg'
  import task_10_6 from './assets/bourbaki/bourbaki-6.jpeg'
  import task_10_7 from './assets/bourbaki/bourbaki-7.jpeg'

  import task_11_1 from './assets/drawings/1-hand.jpeg'
  import task_11_2 from './assets/drawings/2-perspektive.jpeg'
  import task_11_3 from './assets/drawings/3-kopf.png'
  import task_11_4 from './assets/drawings/4-figur.jpeg'
  import task_11_5_1 from './assets/drawings/5-1.jpeg'
  import task_11_5_2 from './assets/drawings/5-2.jpeg'
  import task_11_5_3 from './assets/drawings/5-3.jpeg'
  import task_11_5_4 from './assets/drawings/5-4.jpeg'
  import task_11_5_5 from './assets/drawings/5-5.jpeg'

  import adobe_icon_before from './assets/icon_before.png'
  import adobe_icon_after from './assets/icon.png'
  import paris_full from './assets/paris_full.jpg'

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
      <li>
        <a href="#task-adobe">Illustrator & Photoshop</a>
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
  <section class="vorwort" id="vorwort">
    <h2 class="title">Vorwort</h2>
    <p>
      Dies ist meine Dokumentation für das Modul KiVis an der HSLU. Als
      Webentwickler mit eher technischem Hintergrund gab es für mich einiges zu
      lernen. Auch mit Hinsicht auf meine übliche Arbeit konnte ich einiges
      mitnehmen. Einige Learnings habe ich jeweils direkt zum Task dazu
      geschrieben.
    </p>
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
    <p>
      Als sehr rationaler Mensch dachte ich zuerst, dass die Nähe der Formen zu
      einander direkt auch das Gesamtbild als Nah wirken lässt. Das ist jedoch
      nicht der Fall. Vielmehr haben bekannte Bilder wie z.B. ein Horizont oder
      die Leserichtung uns geprägt, was als Nah und Fern wahrgenommen wird.
    </p>
  </section>
  <section class="task-2" id="task-2">
    <h2 class="title">Figur und Grund</h2>
    <Lightbox>
      <img src={task_2} alt="figur und grund" />
    </Lightbox>
  </section>
  <section class="task-3" id="task-3">
    <h2 class="title">Schriftvergleich</h2>
    <Lightbox>
      <img src={task_3} alt="Typographie Vergleich" />
    </Lightbox>
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
      <p>
        Nebenbei habe ich vom neuen CSS Property <code>text-wrap: pretty;</code>
        gelernt. Es sorgt dafür, dass Text automatisch in möglichst gleichmässige
        Zeilen aufgeteilt wird. Im Web, wo die Breite des Textes nicht immer gleich
        ist, ist das eine sehr nützliche Eigenschaft.
      </p>
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
        <img src={task_7_1} alt="Whitespace" />
      </Lightbox>
      <Lightbox>
        <img src={task_7_2} alt="Whitespace" class="my-2" />
      </Lightbox>
      <p>
        Viel Weissraum wirkt nobel und edel weil es "teuer" ist so viel Platz
        für nichts zu verwenden. Dasselbe gilt auch für Schriften, wie zum
        Beispiel beim Zara Logo. Es wirkt aber auch aufgeräumt und klar.
      </p>
    </div>
  </section>
  <section class="task-8" id="task-8">
    <h2 class="title">Dramaturgie</h2>
    <ImageFlipbook
      images={[
        task_8_0,
        task_8_1,
        task_8_2,
        task_8_3,
        task_8_4,
        task_8_5,
        task_8_6,
        task_8_7,
      ]}
    />
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
    <p>
      Für mich war interessant zu sehen wie die meisten dieser Plakate
      schwieriger zu lesen sind. Ich denke es handelt sich um eine andere
      Zielgruppe, aber wenn ich vorher an Plakate dachte, dachte ich an etwas
      was den Blick fängt und dann aber klar kommuniziert. Diese Plakate sind
      eher Kunstwerke.
    </p>
  </section>
  <section class="task-10" id="task-10">
    <div class="container">
      <h2 class="title">Layout</h2>
      <div class="layout-grid">
        <img src={task_10_0} alt="Bourbaki 0" />
        <Lightbox>
          <img src={task_10_1} alt="Bourbaki 1" />
        </Lightbox>
        <Lightbox>
          <img src={task_10_2} alt="Bourbaki 2" />
        </Lightbox>
        <Lightbox>
          <img src={task_10_3} alt="Bourbaki 3" />
        </Lightbox>
        <Lightbox>
          <img src={task_10_4} alt="Bourbaki 4" />
        </Lightbox>
        <Lightbox>
          <img src={task_10_5} alt="Bourbaki 5" />
        </Lightbox>
        <Lightbox>
          <img src={task_10_6} alt="Bourbaki 6" />
        </Lightbox>
        <Lightbox>
          <img src={task_10_7} alt="Bourbaki 7" />
        </Lightbox>
      </div>
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
  <section class="task-adobe" id="task-adobe">
    <h2 class="title">Illustrator & Photoshop</h2>
    <p>
      Diese Programme haben mir besonders geholfen, um zum einen Icons für ein
      persönliches Projekt als SVG zu erstellen und zum anderen um das zweite
      Bild für die Whitespace Aufgabe zu auszuschneiden und zu bearbeiten.
    </p>

    <div class="flex-row task-1-column-labels">
      <span>Vorher</span>
      <span>---></span>
      <span>Nachher</span>
    </div>
    <div class="flex-row">
      <Lightbox>
        <img height="400px" src={adobe_icon_before} alt="Before Illustrator" />
      </Lightbox>
      <Lightbox>
        <img height="400px" src={adobe_icon_after} alt="After Illustrator" />
      </Lightbox>
    </div>
    <div class="flex-row">
      <Lightbox>
        <img src={paris_full} alt="Before Photoshop" />
      </Lightbox>
      <Lightbox>
        <img src={task_7_2} alt="after Photoshop" />
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
    font-size: 2rem;
    font-weight: 700;
  }

  a {
    scroll-behavior: smooth;
  }

  a,
  p,
  span {
    font-size: 1.5rem;
    font-weight: 400;
  }

  p {
    margin-top: 1rem;
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

  .layout-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .layout-grid img {
    margin-top: 1rem;
  }
</style>
