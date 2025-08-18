<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  interface Props extends HTMLButtonAttributes {
    children?: Snippet
  }

  let { children, ...props }: Props = $props()
</script>

<button class="metallic" {...props}>{@render children?.()}</button>

<style>
  .metallic {
    border: 8px solid transparent;
    --bg-color: rgba(165, 165, 165, 0.8);
    --lighter: rgba(225, 225, 225, 0.5);
    --darker: rgba(0, 0, 0, 0.5);
    --dent: 24px;
    background-image: linear-gradient(var(--bg-color), var(--bg-color)),
      linear-gradient(
        135deg,
        var(--lighter) 5%,
        var(--darker) 20%,
        var(--darker) 30%,
        var(--lighter) 50%,
        var(--darker) 70%,
        var(--lighter) 80%,
        var(--darker) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background-blend-mode: subtract;
    transition: box-shadow 0.15s ease-in-out;
    box-shadow:
      inset var(--dent) var(--dent) 50px rgba(0, 0, 0, 0.2),
      inset calc(-1 * var(--dent)) calc(-1 * var(--dent)) 50px
        rgba(255, 255, 255, 0.7);
  }

  .metallic:hover {
    box-shadow:
      inset var(--dent) var(--dent) 50px rgba(0, 0, 0, 0.25),
      inset calc(-1 * var(--dent)) calc(-1 * var(--dent)) 50px
        rgba(255, 255, 255, 0.8);
  }

  .metallic:active {
    box-shadow:
      inset var(--dent) var(--dent) 50px rgba(0, 0, 0, 0.3),
      inset calc(-1 * var(--dent)) calc(-1 * var(--dent)) 50px
        rgba(255, 255, 255, 0.9);
  }

  button {
    border-radius: 999px;
    padding: 1em 2em;
    min-height: 100px;
    min-width: 500px;
    cursor: pointer;
    color: #333;
    font-weight: 600;
    font-size: 2rem;
    border: none;
  }
</style>
