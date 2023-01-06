export class JwtError extends Error {
    constructor(message) {
        super(message);
        this.name = "JwtError";
    }
}

export class OfflineError extends Error {
    constructor(message) {
        super(message);
        this.name = "OfflineError";
    }
}
