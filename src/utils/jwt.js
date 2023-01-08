import jwt_decode from "jwt-decode";

export function isTokenStillFresh(tokenString) {
    try {
        const token = jwt_decode(tokenString);
        return Math.floor(Date.now() / 1000) < new Date(token?.exp).getTime();
    } catch (e) {
        return false;
    }
}
