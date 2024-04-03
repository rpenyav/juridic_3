export function getAuthToken(): string | null {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const authTokenCookie = cookies.find((cookie) =>
    cookie.startsWith('authToken=')
  );
  return authTokenCookie
    ? decodeURIComponent(authTokenCookie.split('=')[1])
    : null;
}
