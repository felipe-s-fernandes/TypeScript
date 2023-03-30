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
    message: string;
    data: T;
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

    if (userIsEmpty(user)) return;

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

    const user: Partial<IUser> = {
        email: email.value,
        password: password.value,
    };

    if (userIsEmpty(user)) return;

    const response: LoginData = await HTTPRequest(
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

    if (userIsEmpty(user)) return;

    const response: UserData = await HTTPRequest(
        "http://localhost:8000/accounts",
        "PATCH",
        user
    );
    console.log(response);
};

async function HTTPRequest(url: string, method: string, body: Partial<IUser>) {
    const options: RequestInit = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };

    try {
        const response: Response = await fetch(url, options);
        const data: APIResponse<UserData> = await response.json();
        if (response.ok) {
            console.log(data.message);
            return data.data;
        } else {
            console.error(data.message);
            return data.data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function userIsEmpty(user: Partial<IUser>): boolean {
    let key: keyof IUser;
    for (key in user) {
        if (user[key] == "") {
            alert("Preencha o campo " + key);
            return true;
        }
    }
    return false;
}
