<script lang="ts">
  let enlightend = false

  const toggleMode = () => {
    enlightend = !enlightend
  }
</script>

<main>
  <div class="unitylight" class:enlightend></div>
  <section>
    <h2>Sources</h2>
    <ul>
      <li>Landingpage of <a href="https://linear.app">linear.app</a></li>
      <li>Apples "Unity Light" Watch Face</li>
    </ul>
  </section>
</main>

<svelte:document on:click={toggleMode} />

<style>
  @property --color {
    syntax: '<color>';
    inherits: false;
    initial-value: rgb(255, 0, 212);
  }

  @property --left {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 60%;
  }

  @property --right {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 40%;
  }

  @property --angle {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 50%;
  }

  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
  }

  .unitylight {
    width: 100%;
    height: 100vh;

    --color: var(--theme-base);

    --left-gradient: conic-gradient(
      from 90deg at var(--left) 50%,
      var(--color),
      var(--theme-base) var(--angle)
    );
    --right-gradient: conic-gradient(
      from 270deg at var(--right) 50%,
      var(--theme-base) calc(100% - var(--angle)),
      var(--color)
    );

    background-image: var(--left-gradient), var(--right-gradient);
    mask-image: radial-gradient(100% 50%, rgba(0, 0, 0, 0.5), transparent 80%);
    background-size:
      50% 100%,
      50% 100%;
    background-repeat: no-repeat;
    background-position-x: 1%, 99%;
    background-position-y: 0%, 0%;

    transition:
      --color 0.5s ease-in,
      --left 0.5s ease-in-out,
      --right 0.5s ease-in-out,
      --angle 0.6s ease-in-out;
  }

  .enlightend {
    --color: rgb(255, 0, 212);
    --left: 30%;
    --right: 70%;
    --angle: 100%;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin-bottom: 1rem;
  }
</style>
