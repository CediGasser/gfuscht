import { getNowPlaying, getProfile, getTopArtists, getTopTracks } from "$lib/server/Spotify"

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