import {ApiUrlFactory} from "@/services/api-url-factory";
import {RegistrationModel} from "@/models/registration-models";
import axios from "axios";
import {IUserResponse} from "@/models/auth-models";

export class RegistrationService {

    private readonly url  = ApiUrlFactory.create('reg');

    register(body: RegistrationModel): Promise<IUserResponse> {
        return axios.post(this.url.toString(), body);
    }
}