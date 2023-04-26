import { getNowPlaying, getProfile, getTopArtists, getTopTracks } from "$lib/classes/Spotify"

export const load = () => {
    return {
        profile: getProfile(),
        nowPlaying: getNowPlaying(),
        topArtists: getTopArtists(5),
        topTracks: getTopTracks(5),
    }
}