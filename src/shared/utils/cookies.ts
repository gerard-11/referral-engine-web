export function clearAuthCookies() {
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
}
