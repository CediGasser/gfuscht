import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import { sleep } from '$lib/utils'
import type { CurrentlyPlayingObject, 
              UsersTopTracksResponse, 
              UsersTopArtistsResponse,
              CurrentUsersProfileResponse } from '$lib/types/spotify'
import { error } from '@sveltejs/kit';

const token_endpoint = `https://accounts.spotify.com/api/token`;

if (!publicEnv.PUBLIC_SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !publicEnv.PUBLIC_SPOTIFY_REDIRECT_URI) {
    throw new Error('Missing Spotify API secrets')
}

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

type AccessToken = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: 'Bearer';
    refresh_token: string;
} | null;

type TokenRequestData = {
    grant_type: 'refresh_token' | 'authorization_code',
    redirect_uri: string,
    client_id: string,
    client_secret: string,
    refresh_token?: string,
    code?: string,
}

type getAccessTokenParam = {
    authorizationCode?: string, 
    refreshToken?: string
}

export const getAccessToken = async ({ 
    authorizationCode, 
    refreshToken
}: getAccessTokenParam) => {
    let body: TokenRequestData = {
        grant_type: 'refresh_token',
        redirect_uri: publicEnv.PUBLIC_SPOTIFY_REDIRECT_URI,
        client_id: publicEnv.PUBLIC_SPOTIFY_CLIENT_ID,
        client_secret: env.SPOTIFY_CLIENT_SECRET,
    }

    if (authorizationCode) {
        body.grant_type = 'authorization_code'
        body.code = authorizationCode
    } else if (refreshToken) {
        body.grant_type = 'refresh_token'
        body.refresh_token = refreshToken
    } else {
        throw Error('Getting access token failed. Need either valid authorization code or refresh token')
    }

    // Otherwise, fetch a new token
    const accessToken = await fetch(token_endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(body)
    }).then(res => res.json());

    return accessToken as AccessToken;
};

const fetchApi = async (path: string, accessToken: string): Promise<any> => {
    const access_token = accessToken
    const res = await fetch(`https://api.spotify.com/v1${path}`, {
        headers: { 'Authorization': `Bearer ${access_token}` }
    })

    if (res.status === 401) {
        throw error(401, 'Unauthorized: ' + res.status + ' ' + res.statusText + ' ' + await res.text()) 
    } else if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After')
        if (retryAfter) {
            await sleep(parseInt(retryAfter) * 1000)
            return fetchApi(path, access_token)
        }
    } else if (res.status >= 400) {
        throw error(500, `Error fetching ${path}: ${res.status} ${res.statusText}`)
    }

    if (res.status === 204) return null

    return res.json()
}

export const getProfile = async (accessToken: string) => {
    const res: CurrentUsersProfileResponse = await fetchApi('/me', accessToken)

    return { 
        display_name: res.display_name,
        images: res.images,
        external_urls: res.external_urls,
        followers: res.followers,
    }
}

export const getNowPlaying = async (accessToken: string) => {
    const res: CurrentlyPlayingObject = await fetchApi(
        '/me/player/currently-playing', 
        accessToken
    )

    return res && res.item
}

export const getTopTracks = async (accessToken: string, limit = 50, offset = 0, timeRange: TimeRange = 'short_term') => {
    const res: UsersTopTracksResponse = await fetchApi(
        `/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${timeRange}`, 
        accessToken
    )

    return res.items
}

export const getTopArtists = async (accessToken: string, limit = 50, offset = 0, timeRange: TimeRange = 'short_term') => {
    const res: UsersTopArtistsResponse = await fetchApi(
        `/me/top/artists?limit=${limit}&offset=${offset}&time_range=${timeRange}`, 
        accessToken
    )

    return res.items
}