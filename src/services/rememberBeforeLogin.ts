const STORAGE_KEY = "rember-path-before-loging";

export function rememberBeforeLogin(location: string): void {
    localStorage.setItem(STORAGE_KEY, location);
}

export function consumeAfterLogin(): string | null {
    const result = localStorage.getItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    return result
}
