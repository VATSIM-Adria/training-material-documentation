// Configuration
const clientId = '';
const redirectUri = 'http://localhost:8000/';
const authEndpoint = 'https://auth.vatsim.net/oauth/authorize';
const tokenEndpoint = 'https://auth.vatsim.net/oauth/token';
const code = new URLSearchParams(window.location.search).get('code');

// Check if access token is in session
const accessToken = sessionStorage.getItem('vatsim_access_token');

if (!accessToken && !code) {
  // Redirect to VATSIM OAuth2 login
  window.location.href = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=full_name+vatsim_details`;
} else if (code && !accessToken) {
  // Exchange code for token
  fetch('http://localhost:8000/token', {
    method: 'POST',
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem('vatsim_access_token', data.access_token);
      window.location.href = redirectUri; // Clean up URL
    })
    .catch(console.error);
}
