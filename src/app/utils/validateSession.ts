export const isLoggedIn = (name: string, email: string, password: string) => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
        const token = sessionStorage.getItem('token');
        if (!token || token.length === 0) {
            return false;
        } else {
            return btoa(`${name}${email}${password}`) === token
        }
    }
    return false
}