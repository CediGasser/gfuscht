<script lang="ts">
    import type { TrackObjectFull } from '$lib/types/spotify';

    export let track: TrackObjectFull
</script>

<a href={track.external_urls.spotify}><h3>{track.name}</h3></a>
<p>{track.artists.map(artist => artist.name).join(', ')}</p>

<style>
    h3 {
        margin: 0;
        white-space: nowrap;
        line-height: 1rem;
    }

    p {
        margin: 0;
        white-space: nowrap;
        line-height: 1rem;
    }
</style>