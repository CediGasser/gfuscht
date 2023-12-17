import { redirect, error, type RequestHandler } from "@sveltejs/kit";
import { getAccessToken } from "$lib/server/Spotify";

export const GET: RequestHandler = async ({ url, cookies }) => {
  var code = url.searchParams.get('code')
  var state = url.searchParams.get('state')

  if (state === null || code === null) {
    throw redirect(301, '/spotifystats/login')
  } 

  let token = await getAccessToken({authorizationCode: code})

  if (token === null) {
    throw error(401, {
      message: 'Failed to get access token'
    })
  }

  cookies.set('spotify_token', token.access_token, {
    maxAge: token.expires_in * 1000,
    path: '/'
  })

  cookies.set('spotify_refresh_token', token.refresh_token, {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    path: '/'
  })

  throw redirect(301, '/spotifystats')
}