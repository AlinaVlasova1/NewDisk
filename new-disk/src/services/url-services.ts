const proxy = `https://thingproxy.freeboard.io/fetch/`
const baseUrl = proxy + `https://dist.nd.ru/api/`;

export class UrlServices {
    addPathName(pathname: string) {
        const requestUrl = new URL(baseUrl);
        requestUrl.pathname += pathname;
        return requestUrl;
    }
}