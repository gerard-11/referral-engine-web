export const decodeJWT = (token: string) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const decoded = JSON.parse(atob(parts[1]));
        return decoded;
    } catch {
        return null;
    }
};

export const getTokenExpirationTime = (token: string): number | null => {
    const decoded = decodeJWT(token);
    return decoded?.exp ? decoded.exp * 1000 : null;
};

export const isTokenExpiringSoon = (token: string, thresholdMinutes: number = 2): boolean => {
    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) return false;

    const now = Date.now();
    const timeUntilExpiration = expirationTime - now;
    const thresholdMs = thresholdMinutes * 60 * 1000;

    return timeUntilExpiration < thresholdMs;
};
