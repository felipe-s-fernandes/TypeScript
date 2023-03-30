export interface IResponse {
    status: number;
    message: string;
    data: any | null;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}
