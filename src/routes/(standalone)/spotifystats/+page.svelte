<script lang="ts">
    import NowPlaying from '$lib/components/NowPlaying.svelte';
    import Profile from '$lib/components/Profile.svelte';

    export let data
    $: ({ profile, nowPlaying, topArtists, topTracks } = data)
</script>

<main>
    <div class="wrapper">

        <div class="profile-info">
            <Profile {profile} />
            <NowPlaying item={nowPlaying} />
        </div>

        <div class="ranking">
            <h2>Top Artists</h2>
            <ul>
                {#each topArtists as artist}
                    <li>{artist.name}</li>
                {/each}
            </ul>
        </div>

        <div class="ranking">
            <h2>Top Tracks</h2>
            <ul>
                {#each topTracks as track}
                    <li>{track.name}</li>
                {/each}
            </ul>
        </div>
        
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        font-family: 'Courier New', Courier, monospace;
    }

    .wrapper {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 1rem;
        backdrop-filter: blur(8px);
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }

    h2 {
        margin-top: 0;
    }

    ul {
        list-style: none;
        padding: 0;
    }
</style>