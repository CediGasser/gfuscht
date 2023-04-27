import { getNowPlaying, getProfile, getTopArtists, getTopTracks } from "$lib/classes/Spotify"

export const load = () => {
    return {
        streamed: {
            profile: getProfile(),
            nowPlaying: getNowPlaying(),
            topArtists: getTopArtists(5),
            topTracks: getTopTracks(5),
        }
    }
}