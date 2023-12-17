import { getAccessToken, getNowPlaying, getProfile, getTopArtists, getTopTracks } from "$lib/server/Spotify"
import { redirect } from "@sveltejs/kit"

export const load = async ({ cookies }) => {
    let accessToken = cookies.get('spotify_token')

    if (!accessToken) {
        let refreshToken = cookies.get('spotify_refresh_token')
        if (!refreshToken) {
            throw redirect(301, '/spotifystats/login')
        }

        accessToken = (await getAccessToken({refreshToken}))?.access_token
    }

    if (!accessToken) {
        throw redirect(301, '/spotifystats/login')
    }

    return {
        profile: getProfile(accessToken),
        nowPlaying: getNowPlaying(accessToken),
        topTracks: getTopTracks(accessToken, 5),
        streamed: {
            topArtists: getTopArtists(accessToken, 5),
        }
    }
}