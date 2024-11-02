export class RegistrationModel {
    email: string;
    password: string;
    confirm_password: string;

    constructor(email: string, password: string, confirm_password: string) {
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
    }
}

export class RegistrationResponse {
    id: number;
    email: string;

    constructor(id: number, email: string) {
        this.id = id;
        this.email = email;
    }
}