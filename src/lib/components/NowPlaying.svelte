<script lang="ts">
  import type { EpisodeObject, TrackObjectFull } from "$lib/types/spotify";
  import Track from "./Track.svelte";

  interface Props {
    item: TrackObjectFull | EpisodeObject | null;
  }

  let { item }: Props = $props();

  let name: string = $state("");
  let creator: string = $state("");

  if (item?.type === "track") {
    name = item.name;
    creator = item.artists.map((artist) => artist.name).join(", ");
  } else if (item?.type === "episode") {
    name = item.name;
    creator = item.show.name;
  }
</script>

<div>
  {#if item?.type === "track"}
    <h2>Listening to</h2>
    <Track track={item} />
  {:else if item?.type === "episode"}
    <h2>Listening to</h2>
    <h3>{name}</h3>
    <p>{creator}</p>
  {:else}
    <h2>Not Playing</h2>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
