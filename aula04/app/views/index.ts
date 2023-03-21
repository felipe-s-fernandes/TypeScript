import { EmailInput, NameInput, PasswordInput } from "../models/inputs.js";

customElements.define("email-input", EmailInput);
customElements.define("password-input", PasswordInput);
customElements.define("name-input", NameInput);

const postButton: HTMLButtonElement = document.querySelector("#post-btn")!;
const loginButton: HTMLButtonElement = document.querySelector("#login-btn")!;
const patchButton: HTMLButtonElement = document.querySelector("#patch-btn")!;

interface IUser {
    name: string;
    email: string;
    password: string;
}

interface APIResponse<T> {
    data: T;
    errors: string[];
}

interface UserData {
    id: number;
    email: string;
    name: string;
}

interface LoginData {
    id: number;
}

postButton.onclick = async () => {
    const name = document.querySelector("name-input") as NameInput;
    const email = document.querySelector("email-input") as EmailInput;
    const password = document.querySelector("password-input") as PasswordInput;

    const user: IUser = {
        name: name.value,
        email: email.value,
        password: password.value,
    };

    const response: UserData = await HTTPRequest(
        "http://localhost:8000/accounts",
        "POST",
        user
    );
    console.log(response);
};

loginButton.onclick = async () => {
    const name = document.querySelector("name-input") as NameInput;
    const email = document.querySelector("email-input") as EmailInput;
    const password = document.querySelector("password-input") as PasswordInput;

    const user: IUser = {
        name: name.value,
        email: email.value,
        password: password.value,
    };

    const response: Partial<UserData> = await HTTPRequest(
        "http://localhost:8000/accounts/login",
        "POST",
        user
    );
    console.log(response);
};

patchButton.onclick = async () => {
    const name = document.querySelector("name-input") as NameInput;
    const email = document.querySelector("email-input") as EmailInput;
    const password = document.querySelector("password-input") as PasswordInput;

    const user: IUser = {
        name: name.value,
        email: email.value,
        password: password.value,
    };

    const response: UserData = await HTTPRequest(
        "http://localhost:8000/accounts",
        "PATCH",
        user
    );
    console.log(response);
};

async function HTTPRequest(url: string, method: string, body: IUser) {
    const options: RequestInit = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };

    try {
        const response: APIResponse<UserData> = await fetch(url, options).then(
            (data) => data.json()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
