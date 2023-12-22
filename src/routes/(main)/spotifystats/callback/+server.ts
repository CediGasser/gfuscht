import { redirect, error, type RequestHandler } from "@sveltejs/kit";
import { getAccessToken } from "$lib/server/Spotify";

export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
  var code = url.searchParams.get('code')
  var state = url.searchParams.get('state')

  setHeaders({
    'Cache-Control': 'private, max-age=0, no-cache'
  })

  if (state === null || code === null) {
    throw redirect(301, '/spotifystats/login')
  } 

  let token = null
  try {
    token = await getAccessToken({authorizationCode: code})
  } catch (e) {
    console.error(e)
    throw redirect(301, '/spotifystats/login')
  }

  if (token === null) {
    throw error(401, {
      message: 'Failed to get access token'
    })
  }

  cookies.set('spotify_token', token.access_token, {
    maxAge: token.expires_in,
    path: '/'
  })

  cookies.set('spotify_refresh_token', token.refresh_token, {
    maxAge: 365 * 24 * 60 * 60,
    path: '/'
  })

  throw redirect(301, '/spotifystats')
}