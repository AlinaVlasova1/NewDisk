export class AuthPostBody {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class AutToken {
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}

export interface IResponseAuthorization {
    data: {
        accessToken: string;
    }
}

export interface IUserInfoAfterAuthorization {
    data: {
        id: number;
        email: string;
    }
}