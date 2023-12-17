<script lang="ts">
    import { fadeOnLoad } from "$lib/actions";
    import type {
        ExternalUrlObject,
        FollowersObject,
        ImageObject,
    } from "$lib/types/spotify";

    export let profile: {
        display_name: string | undefined;
        external_urls: ExternalUrlObject;
        followers: FollowersObject | undefined;
        images: ImageObject[] | undefined;
    };

    let img =
        profile.images && profile.images.length > 0
            ? profile.images[0]
            : { url: "/trump.png", height: 300, width: 300 };
</script>

<img
    use:fadeOnLoad={{ duration: 0.2 }}
    src={img.url}
    height={200}
    width={200}
    alt={profile.display_name}
/>
<a href={profile.external_urls.spotify}>{profile.display_name}</a>
{#if profile.followers}
    <p>{profile.followers.total} followers</p>
{/if}

<style>
    img {
        border-radius: 50%;
        margin-block: 2rem;
        box-shadow: 0 0 1rem var(--theme-shadow);
    }

    a {
        font-size: 2rem;
        font-weight: bold;
    }

    p {
        font-size: 1.5rem;
        margin: 0;
    }
</style>
