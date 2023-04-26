<script lang="ts">
    import type { EpisodeObject, TrackObjectFull } from 'spotify-api'

    export let item: TrackObjectFull | EpisodeObject | null

    let name: string
    let creator: string
    
    if (item?.type === 'track') {
        name = item.name
        creator = item.artists.map(artist => artist.name).join(', ')
    } else if (item?.type === 'episode') {
        name = item.name
        creator = item.show.name
    }
</script>

<div>
    {#if item}
        <h2>Now Playing</h2>
        <p>{name} - {creator}</p>
    {:else}
        <h2>Not Playing</h2>
    {/if}
</div>