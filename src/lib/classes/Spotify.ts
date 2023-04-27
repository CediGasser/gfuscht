import { browser } from '$app/environment';
import type { CurrentlyPlayingObject, 
              UsersTopTracksResponse, 
              UsersTopArtistsResponse,
              CurrentUsersProfileResponse } from 'spotify-api'

const redirect_uri = browser ? 'https://gfuscht.cedricgasser.com/spotifystats' : 'http://localhost:5173/'
const token_endpoint = `https://accounts.spotify.com/api/token`;

type SpotifyToken = {
    access_token: string;
    expires_at: Date;
} | null;


const getAccessToken = async () => {

    // If we already have a token and it hasn't expired, return it
    if (token && token.expires_at > new Date()) {
        return token.access_token
    }

    // Otherwise, fetch a new token
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_USER_REFRESH_TOKEN} = await import('$env/static/private')

	const newToken = await fetch(token_endpoint, {
		method: 'POST',
		headers: {
		    'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_USER_REFRESH_TOKEN,
			redirect_uri,
			client_id: SPOTIFY_CLIENT_ID,
			client_secret: SPOTIFY_CLIENT_SECRET,
		})
	}).then(res => res.json());

    // Update the singleton token with the new token
    token = {
        access_token: newToken.access_token,
        expires_at: new Date(new Date().getTime() + newToken.expires_in * 1000),
    }

	return newToken.access_token as string;
};

let token: SpotifyToken = null; // Singleton which will be used to store the token so we don't have to fetch it every time
let retried = false // Flag to prevent infinite loops

const fetchApi = async (path: string): Promise<any> => {
    const access_token = await getAccessToken()
    const res = await fetch(`https://api.spotify.com/v1${path}`, {
        headers: { 'Authorization': `Bearer ${access_token}` }
    })

    if (res.status === 401) {
        if (retried) throw new Error('Unauthorized')
        retried = true
        token = null
        return fetchApi(path)
    } else if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After')
        if (retryAfter) {
            if (retried) throw new Error('Already retried')
            retried = true
            await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter) * 1000))
            return fetchApi(path)
        }
    } else if (res.status >= 400) {
        throw new Error(`Error fetching ${path}: ${res.status} ${res.statusText}`)
    }

    if (res.body === null) return null

    return await res.json()
}

export const getProfile = async () => {
    const res: CurrentUsersProfileResponse = await fetchApi('/me')

    return res
}

export const getNowPlaying = async () => {
    const res: CurrentlyPlayingObject = await fetchApi('/me/player/currently-playing')

    return res && res.item
}

export const getTopTracks = async (limit = 50, offset = 0) => {
    const res: UsersTopTracksResponse = await fetchApi(`/me/top/tracks?limit=${limit}&offset=${offset}&time_range=short_term`)

    return res.items
}

export const getTopArtists = async (limit = 50, offset = 0) => {
    const res: UsersTopArtistsResponse = await fetchApi(`/me/top/artists?limit=${limit}&offset=${offset}&time_range=short_term`)

    return res.items
}