import { getAccessToken, getNowPlaying, getProfile, getTopArtists, getTopTracks, type HttpError } from "$lib/server/Spotify"
import { error, redirect} from "@sveltejs/kit"


export const load = async ({ cookies, setHeaders }) => {
    let accessToken = cookies.get('spotify_token')
    let refreshToken = cookies.get('spotify_refresh_token')
    setHeaders({
        'Cache-Control': 'private, max-age=0, no-cache'
    })

    // redirect to login if no tokens are present
    if (!accessToken && !refreshToken) {
        throw redirect(301, '/spotifystats/login')
    }

    // get new access token if only refresh token is present
    if (!accessToken) {
        let token = await getAccessToken({refreshToken})

        if (!token) {
            // if refresh token is invalid, delete cookies and redirect to login
            cookies.delete('spotify_token')
            cookies.delete('spotify_refresh_token')
            throw redirect(301, '/spotifystats/login')
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
            profile: getProfile(accessToken),
            nowPlaying: getNowPlaying(accessToken),
            topTracks: getTopTracks(accessToken, 5),
            streamed: {
                topArtists: getTopArtists(accessToken, 5),
            }
        }
    } catch (_e) {
        let e = _e as HttpError
        console.error('Error getting Spotify stats')
        console.error(e)
        throw error(e.status, e.message)
    }

    return stats
}