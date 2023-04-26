<script lang="ts">
    import type { CurrentUsersProfileResponse } from "spotify-api";
    import { prop_dev } from "svelte/internal";

    export let profile: CurrentUsersProfileResponse
    console.log(profile)
    let img = profile.images && profile.images.length > 0 ? profile.images[0] : { url: '/trump.png', height: 300, width: 300 }
</script>


<img src={img.url} height={200} width={200} alt={profile.display_name} />
<a href={profile.external_urls.spotify}>{profile.display_name}</a>
{#if profile.product && profile.product != 'undefined' && profile.product != 'open'}
    <p>{profile.product}</p>
{/if}
{#if profile.followers}
    <p>{profile.followers.total} followers</p>
{/if}

<style>
    img {
        border-radius: 50%;
        margin-block: 2rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }

    a {
        font-size: 2rem;
        font-weight: bold;
        text-decoration: none;
        color: #000;
    }

    a:hover {
        text-decoration: underline;
    }

    p {
        font-size: 1.5rem;
        margin: 0;
    }
</style>