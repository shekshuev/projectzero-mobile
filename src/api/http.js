import axios from "axios";

class Http {
    constructor(builder) {
        this.http = axios.create({
            baseURL: builder.apiUrl
        });
        for (let header in builder.headers) {
            this.http.defaults.headers[header] = builder.headers[header];
        }
        this.http.defaults.headers["accept"] = "application/json";
    }

    async post(where, data) {
        return await this.http.post(where, data);
    }

    async get(where, data) {
        return await this.http.get(where, { params: data });
    }

    async put(where, data) {
        return await this.http.put(where, data);
    }

    async patch(where, data) {
        return await this.http.patch(where, data);
    }

    async delete(where, data) {
        return await this.http.delete(where, data);
    }
}

class HttpBuilder {
    constructor() {
        this.headers = [];
        this.apiUrl = null;
    }

    setApiUrl(apiUrl) {
        this.apiUrl = apiUrl;
        return this;
    }

    setAuthorizationToken(token) {
        this.headers["Authorization"] = `Bearer ${token}`;
        return this;
    }

    setContentType(contentType) {
        this.headers["Content-Type"] = contentType;
        return this;
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    useDefaultContentType() {
        return this.setContentType("application/json");
    }

    build() {
        return new Http(this);
    }
}

export { HttpBuilder };
