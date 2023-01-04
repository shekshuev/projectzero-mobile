import jwt_decode from "jwt-decode";
import { JwtError } from "@utils/errors";

export function isTokenStillFresh(tokenString) {
    const token = decodeToken(tokenString);
    console.log(token);
    return Math.floor(Date.now() / 1000) < new Date(token?.exp).getTime();
}

function decodeToken(token) {
    try {
        return jwt_decode(token);
    } catch {
        throw new JwtError();
    }
}
