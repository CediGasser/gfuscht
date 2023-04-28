import { env } from '$env/dynamic/private'
import type { CurrentlyPlayingObject, 
              UsersTopTracksResponse, 
              UsersTopArtistsResponse,
              CurrentUsersProfileResponse } from '$lib/types/spotify'

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
    if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_USER_REFRESH_TOKEN || !env.SPOTIFY_REDIRECT_URI) {
        throw new Error('Missing Spotify API secrets')
    }

    const newToken = await fetch(token_endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: env.SPOTIFY_USER_REFRESH_TOKEN,
            redirect_uri: env.SPOTIFY_REDIRECT_URI,
            client_id: env.SPOTIFY_CLIENT_ID,
            client_secret: env.SPOTIFY_CLIENT_SECRET,
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
        if (retried) throw new Error('Unauthorized: ' + res.status + ' ' + res.statusText + ' ' + await res.text()) 
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

    return { 
        display_name: res.display_name,
        images: res.images,
        external_urls: res.external_urls,
        followers: res.followers,
    }
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