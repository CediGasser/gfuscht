<script lang="ts">
  interface Props {
    images: string[]
  }
  let { images }: Props = $props()

  let selectedImage = $state(0)
  let lastImage = $derived(images.length)

  const nextImage = () => {
    selectedImage = (selectedImage + 1) % images.length
  }

  const prevImage = () => {
    selectedImage = (selectedImage - 1 + images.length) % images.length
  }
</script>

<div class="wrapper">
  <img src={images[selectedImage]} alt={images[selectedImage]} />
  <div class="controls">
    <button disabled={selectedImage === 0} onclick={prevImage}>Previous</button>
    <button disabled={selectedImage === lastImage - 1} onclick={nextImage}>
      Next
    </button>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 1rem;
    height: 500px;
    width: 800px;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  button {
    padding: 0.5rem 1rem;
    border: 2px solid var(--theme-primary);
    border-radius: 0.5rem;
    background-color: var(--theme-base);
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
  }

  button:disabled {
    background-color: var(--theme-muted);
    color: #999;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: var(--theme-primary);
  }
</style>
