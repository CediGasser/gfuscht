<script lang="ts">
  import { selectOnClick } from '$lib/actions'

  let content = $state('Hello World')
  let animate = $state(false)
  let animationTimeout: ReturnType<typeof setTimeout>

  // copy content to clipboard
  function copyToClipboard(): void {
    navigator.clipboard.writeText(content)
    animate = true

    if (animationTimeout) clearTimeout(animationTimeout)

    animationTimeout = setTimeout(() => {
      animate = false
    }, 1500)
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'c') {
      copyToClipboard()
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="wrapper"
  role="region"
  onkeydown={handleKeydown}
  aria-label="Copy text to clipboard"
>
  <input type="text" bind:value={content} use:selectOnClick />
  <button type="button" onclick={copyToClipboard}>
    Copy
    <span class="svg-container">
      {#if !animate}
        <svg
          fill="white"
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          class="copy"
        >
          <path
            fill-rule="evenodd"
            d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
          ></path>
        </svg>
      {:else}
        <svg
          fill="white"
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          class="success animate"
        >
          <path
            fill-rule="evenodd"
            d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
          ></path>
        </svg>
      {/if}
    </span>
  </button>
</div>

<style>
  * {
    font-family: 'Courier New', Courier, monospace;
    color: rgb(236, 232, 252);
  }
  div.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  button {
    all: unset;
    cursor: pointer;
    background-color: #b22222;
    cursor: pointer;
  }

  input,
  button {
    box-sizing: border-box;
    all: unset;
    width: 100%;
    height: 2rem;
    font-size: 1.5rem;
    margin: 0.5rem;
    border-radius: 16px;
    text-align: center;
    padding: 8px;
  }

  input {
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: 150ms;
  }

  input:focus {
    box-shadow: inset 3px 3px 8px 6px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(0, 0, 0, 0);
    transition: 150ms;
    filter: brightness(110%);
  }

  button {
    background: radial-gradient(
      circle at bottom right,
      #c80eb0 0,
      #2937f9 100%
    );
    cursor: pointer;
  }

  button:hover {
    transition: filter 150ms;
    filter: brightness(110%);
    transform: translateY(-2px);
    transition: transform 150ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  button:focus-visible {
    outline: #db9cff solid 2px;
  }

  button:active {
    background-color: #f00c0c;
    transition: filter 150ms;
  }

  .svg-container {
    position: relative;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
    vertical-align: middle;
  }

  .svg-container svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    transition: opacity 0.2s;
  }

  .svg-container .copy {
    opacity: 1;
    z-index: 1;
  }

  .svg-container .success {
    opacity: 1;
    z-index: 2;
    animation: animateSuccess 1.5s;
  }

  @keyframes animateSuccess {
    0% {
      transform: scale(0) rotate(90deg);
      opacity: 0;
    }
    10% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    90% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotate(90deg);
      opacity: 0;
    }
  }
</style>
