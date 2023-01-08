export class OfflineError extends Error {
    constructor(message) {
        super(message);
        this.name = "OfflineError";
    }
}
