<script lang="ts">
  import NowPlaying from '$lib/components/NowPlaying.svelte'
  import Profile from '$lib/components/Profile.svelte'
  import Seo from '$lib/components/Seo.svelte'
  import Track from '$lib/components/Track.svelte'
  import { fly } from 'svelte/transition'

  export let data
  $: ({ topArtists } = data.streamed)
  $: ({ profile, nowPlaying, topTracks } = data)

  let selectedTab = 'tracks'
</script>

<Seo
  title="Spotifystats"
  description="See your top tracks and artists from Spotify."
  keywords="spotify, top tracks, top artists"
/>

<main>
  <div class="wrapper">
    <div class="profile-info">
      <Profile {profile} />

      <NowPlaying item={nowPlaying} />
    </div>

    <div class="ranking">
      <!-- A select that is styles as a button group to switch between tabs -->
      <div class="ranking-header">
        <p>Top</p>
        <div class="tab-group">
          <input
            type="radio"
            name="tabs"
            id="tracks"
            bind:group={selectedTab}
            value="tracks"
          />
          <label for="tracks">Tracks</label>

          <input
            type="radio"
            name="tabs"
            id="artists"
            bind:group={selectedTab}
            value="artists"
          />
          <label for="artists">Artists</label>
          <span class="glider" />
        </div>
      </div>

      <!-- The content of the tabs -->
      <div class="ranking-lists">
        {#if selectedTab === 'tracks'}
          <ul
            in:fly={{ x: 20, duration: 150, delay: 150 }}
            out:fly={{ x: 20, duration: 150 }}
          >
            {#each topTracks as track}
              <li>
                <Track {track} />
              </li>
            {/each}
          </ul>
        {:else if selectedTab === 'artists'}
          <ul
            in:fly={{ x: -20, duration: 150, delay: 150 }}
            out:fly={{ x: -20, duration: 150 }}
          >
            {#await topArtists}
              <p>Loading...</p>
            {:then topArtists}
              {#each topArtists as artist}
                <li>
                  <a href={artist.external_urls.spotify}
                    ><h3>{artist.name}</h3></a
                  >
                </li>
              {/each}
            {:catch error}
              <p>{error.message}</p>
            {/await}
          </ul>
        {/if}
      </div>
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
    padding: 2rem;
    border-radius: 1rem;
    backdrop-filter: blur(8px);
    background-color: var(--theme-surface);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    gap: 4rem;
    min-height: 500px;
  }

  ul {
    position: absolute;
    list-style: none;
    padding: 0;
    max-width: 300px;
  }

  li {
    min-height: 2rem;
    margin-block: 0.5rem;
    line-height: 1rem;
    overflow: hidden;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    overflow: hidden;
  }

  .ranking {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ranking-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .ranking-header {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .ranking-lists {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    overflow: hidden;
  }

  .tab-group input[type='radio'] {
    display: none;
  }

  .tab-group {
    display: flex;
    padding: 0.2rem;
    border-radius: 0.7rem;
    box-shadow: inset 0 0 6px 1px rgba(0, 0, 0, 0.2);
    background-color: var(--theme-base);
  }

  .tab-group label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 100px;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
    z-index: 2;
  }

  .tab-group input[type='radio']:checked + label {
    color: var(--theme-primary);
  }

  input[id='tracks']:checked ~ .glider {
    transform: translateX(0);
  }

  input[id='artists']:checked ~ .glider {
    transform: translateX(100%);
  }

  .glider {
    position: absolute;
    display: flex;
    height: 2rem;
    width: 100px;
    background-color: var(--theme-overlay);
    z-index: 1;
    border-radius: 0.5rem;
    transition: 0.15s ease-out;
  }

  @media (max-width: 800px) {
    .tab-group {
      transform: scale(0.8);
    }

    .wrapper {
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>
