<script lang="ts">
  import { env as publicEnv } from '$env/dynamic/public'
  import Seo from '$lib/components/Seo.svelte'
  import { randomString } from '$lib/utils'

  let url = $state('https://accounts.spotify.com/authorize?')
  let params = {
    client_id: publicEnv.PUBLIC_SPOTIFY_CLIENT_ID ?? '',
    response_type: 'code',
    redirect_uri: publicEnv.PUBLIC_SPOTIFY_REDIRECT_URI ?? '',
    scope:
      'user-read-private user-read-email user-top-read user-read-currently-playing',
    state: randomString(16),
  }

  url += new URLSearchParams(params).toString()
</script>

<Seo
  title="Login with Spotify"
  description="Login with Spotify to see your top tracks and artists."
  keywords="spotify, login, top tracks, top artists"
/>

<main>
  <a href={url}>Login with Spotify</a>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
  }
  a {
    background-color: var(--theme-primary);
    border: none;
    border-radius: var(--theme-radius);
    color: var(--theme-text);
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    padding: 10px 20px;
    text-decoration: none;
    transition: transform 0.2s ease-in-out;
  }
  a:hover {
    transform: scale(1.05);
  }
</style>
