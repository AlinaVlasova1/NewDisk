export class AuthModel {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export interface IAuthResponse {
    data: {
        accessToken: string;
    }
}

export interface IUserResponse {
    data: {
        id: number;
        email: string;
    }
}