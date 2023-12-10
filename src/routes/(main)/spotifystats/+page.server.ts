import { getNowPlaying, getProfile, getTopArtists, getTopTracks } from "$lib/server/Spotify"

export const load = () => {
    return {
        profile: getProfile(),
        nowPlaying: getNowPlaying(),
        topTracks: getTopTracks(5),
        streamed: {
            topArtists: getTopArtists(5),
        }
    }
}