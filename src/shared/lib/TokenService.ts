export namespace TokenService {
    export function getToken() {
        return localStorage.get('token');
    }

    export function setToken(token: string) {
        localStorage.setItem('token', token);
    }

    export function deleteToken() {
        localStorage.removeItem('token');
    }
}
