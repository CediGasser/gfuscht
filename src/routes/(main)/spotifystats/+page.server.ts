import { getAccessToken, getNowPlaying, getProfile, getTopArtists, getTopTracks, type HttpError } from "$lib/server/Spotify"
import { error, redirect, type NumericRange} from "@sveltejs/kit"


export const load = async ({ cookies, setHeaders }) => {
    let accessToken = cookies.get('spotify_token')
    let refreshToken = cookies.get('spotify_refresh_token')
    setHeaders({
        'Cache-Control': 'private, max-age=0, no-cache'
    })

    // redirect to login if no tokens are present
    if (!accessToken && !refreshToken) {
        redirect(301, '/spotifystats/login');
    }

    // get new access token if only refresh token is present
    if (!accessToken) {
        let token = await getAccessToken({refreshToken})

        if (!token) {
            // if refresh token is invalid, delete cookies and redirect to login
            cookies.delete('spotify_token', { path: '/' })
            cookies.delete('spotify_refresh_token', { path: '/' })
            redirect(301, '/spotifystats/login');
        }

        cookies.set('spotify_token', token.access_token, {
            maxAge: token.expires_in,
            path: '/'
        })
        accessToken = token.access_token
    }

    let stats = null

    try {
        stats = {
            profile: await getProfile(accessToken),
            nowPlaying: await getNowPlaying(accessToken),
            topTracks: await getTopTracks(accessToken, 5),
            streamed: {
                topArtists: getTopArtists(accessToken, 5),
            }
        }
    } catch (_e) {
        let e = _e as HttpError
        console.error('Error getting Spotify stats')
        console.error(JSON.stringify(e))
        error(e.status as NumericRange<400, 599>, e.message);
    }

    return stats
}