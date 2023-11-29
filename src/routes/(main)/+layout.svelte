<script lang="ts">
  import '$lib/assets/css/reset.css'
  import '$lib/assets/css/app.css'
</script>

<div class="theme-rose-pine">
  <main>
    <slot />
  </main>

  <footer>
    <p>
      Code can be found <a href="https://github.com/CediGasser/gfuscht">here</a>
    </p>
  </footer>
</div>

<style>
  div {
    background-color: var(--theme-base);
    color: var(--theme-text);
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: 100vh;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: var(--theme-surface);
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
