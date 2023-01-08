import jwt_decode from "jwt-decode";
import { JwtError } from "@utils/errors";

export function isTokenStillFresh(tokenString) {
    try {
        const token = decodeToken(tokenString);
        return Math.floor(Date.now() / 1000) < new Date(token?.exp).getTime();
    } catch (e) {
        if (e instanceof JwtError) {
            return false;
        } else {
            throw e;
        }
    }
}

function decodeToken(token) {
    try {
        return jwt_decode(token);
    } catch {
        throw new JwtError();
    }
}
