import {UrlServices} from "@/services/url-services";
import {RegistrationModel, RegistrationResponse} from "@/models/registration-models";
import axios from "axios";

export class RegistrationService {
    urlService = new UrlServices();
    url  = this.urlService.addPathName('reg');

    doRegistrationUser(body: RegistrationModel): Promise<RegistrationResponse> {
        return axios.post(this.url.toString(), body);
    }

}