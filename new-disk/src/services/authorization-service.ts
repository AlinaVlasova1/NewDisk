import {UrlServices} from "@/services/url-services";
import axios from "axios";
import {
    AuthPostBody,
    IResponseAuthorization, IUserInfoAfterAuthorization,
} from "@/models/auth-models";

export class AuthorizationService {

    urlService = new UrlServices();
    url  = this.urlService.addPathName('auth');

    doAuthorizationUser(body: AuthPostBody): Promise<IResponseAuthorization> {
        console.log(this.url.toString());
        return axios.post(this.url.toString(), body);
    }

    getInfoUser(accessToken: string): Promise<IUserInfoAfterAuthorization> {
        return axios.get(this.url.toString(), {headers: {Authorization: `Bearer ${accessToken}`}});
    }
}