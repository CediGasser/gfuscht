<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import './theme.css';

  interface Props extends HTMLInputAttributes {
    volume: number;
  }
  let { volume, ...props }: Props = $props();

  const volumePercent = $derived(Math.round(volume * 100));
</script>

<div class="container">
  <label for="volume-slider" class="sr-only"> Volume </label>
  <input
    {...props}
    type="range"
    id="volume-slider"
    min="0"
    max="1"
    step="0.01"
    value={volume}
    aria-orientation="vertical"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow={volumePercent}
    aria-valuetext={`Volume: ${volumePercent}%`}
  />
  <span class="volume-display" aria-hidden="true"> {volumePercent}% </span>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .volume-display {
    color: black;
    font-size: 0.875rem;
    font-weight: 500;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    height: 192px; /* h-48 equivalent */
  }

  /* Vertical orientation */
  input[type='range'][aria-orientation='vertical'] {
    writing-mode: bt-lr;
    -webkit-appearance: slider-vertical;
    width: 32px; /* Width of the thumb */
  }

  /* Thumb Styles */
  input[type='range']::-webkit-slider-thumb,
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none; /* For WebKit */
    -moz-appearance: none;    /* For Mozilla */
    appearance: none;         /* Standard */
    height: 32px;
    width: 32px;
    border-radius: 9999px;
    cursor: pointer;
    background-color: transparent; /* Ensure no default fill */
    margin-top: -12px; /* Adjust for vertical centering */

    /* Metallic styles - duplicated for clarity and specificity */
    border: 8px solid transparent;
    --bg-color: rgba(165, 165, 165, 0.8);
    --lighter: rgba(225, 225, 225, 0.5);
    --darker: rgba(0, 0, 0, 0.5);
    --dent: 12px; /* Adjusted for smaller thumb */
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
      inset var(--dent) var(--dent) 25px rgba(0, 0, 0, 0.2),
      inset calc(-1 * var(--dent)) calc(-1 * var(--dent)) 25px
        rgba(255, 255, 255, 0.7);
  }

  /* Track Styles */
  input[type='range']::-webkit-slider-runnable-track {
    width: 8px;
    height: 100%;
    background: #e5e7eb; /* gray-200 */
    border-radius: 8px;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.5);
  }

  input[type='range']::-moz-range-track {
    width: 8px;
    height: 100%;
    background: #e5e7eb; /* gray-200 */
    border-radius: 8px;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.5);
  }

</style>