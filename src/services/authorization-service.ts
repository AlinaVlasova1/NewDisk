import {ApiUrlFactory} from "@/services/api-url-factory";
import axios from "axios";
import {
    AuthModel,
    IAuthResponse, IUserResponse,
} from "@/models/auth-models";

export class AuthorizationService {

    private readonly url= ApiUrlFactory.create('auth');

    authorize(body: AuthModel): Promise<IAuthResponse> {
        return axios.post(this.url.toString(), body);
    }

    getInfoUser(): Promise<IUserResponse> {
        return axios.get(this.url.toString());
    }
}