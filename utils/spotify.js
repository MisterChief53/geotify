const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

var currentToken;
var tokenExists = false;

const getAccessToken = async () => {

    if(tokenExists) {
        return currentToken;
    }

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      }),
    });

    currentToken = await response.json();
    tokenExists = true;

    return currentToken;
  };

  export const getTestRequest = async () => {
    const {access_token} = await getAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    return response;
  };

  export const getTrackData = async (track) => {
    const {access_token} = await getAccessToken();

    const endpoint = `https://api.spotify.com/v1/search?q=${track}&type=track&limit=1`

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    return response;
  };

  export const getTrackFeatures = async (id) => {
    const {access_token} = await getAccessToken();

    const endpoint = `https://api.spotify.com/v1/audio-features/${id}`

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    return response;
  };

  export const getArtistsData = async (id) => {
    const {access_token} = await getAccessToken();

    const endpoint = `https://api.spotify.com/v1/artists/${id}`

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    return response;
  };

  