export const FILE_FORMAT_ERROR = "FILE_FORMAT_ERROR";

export class OfflineError extends Error {
    constructor(message) {
        super(message);
        this.name = "OfflineError";
    }
}
