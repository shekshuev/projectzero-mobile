export class JwtError extends Error {
    constructor(message) {
        super(message);
        this.name = "JwtError";
    }
}
