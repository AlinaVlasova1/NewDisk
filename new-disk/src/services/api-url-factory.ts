const baseUrl = `https://dist.nd.ru/api/`;

export class ApiUrlFactory {
    static create(pathname: string) : URL {
        const requestUrl = new URL(baseUrl);
        requestUrl.pathname += pathname;
        return requestUrl;
    }
}