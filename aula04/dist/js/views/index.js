var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EmailInput, NameInput, PasswordInput } from "../models/inputs.js";
customElements.define("email-input", EmailInput);
customElements.define("password-input", PasswordInput);
customElements.define("name-input", NameInput);
const postButton = document.querySelector("#post-btn");
const loginButton = document.querySelector("#login-btn");
const patchButton = document.querySelector("#patch-btn");
postButton.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.querySelector("name-input");
    const email = document.querySelector("email-input");
    const password = document.querySelector("password-input");
    const user = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    if (userIsEmpty(user))
        return;
    const response = yield HTTPRequest("http://localhost:8000/accounts", "POST", user);
    console.log(response);
});
loginButton.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.querySelector("name-input");
    const email = document.querySelector("email-input");
    const password = document.querySelector("password-input");
    const user = {
        email: email.value,
        password: password.value,
    };
    if (userIsEmpty(user))
        return;
    const response = yield HTTPRequest("http://localhost:8000/accounts/login", "POST", user);
    console.log(response);
});
patchButton.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.querySelector("name-input");
    const email = document.querySelector("email-input");
    const password = document.querySelector("password-input");
    const user = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    if (userIsEmpty(user))
        return;
    const response = yield HTTPRequest("http://localhost:8000/accounts", "PATCH", user);
    console.log(response);
});
function HTTPRequest(url, method, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        try {
            const response = yield fetch(url, options).then((data) => data.json());
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
function userIsEmpty(user) {
    let key;
    for (key in user) {
        if (user[key] == "") {
            alert("Preencha o campo " + key);
            return true;
        }
    }
    return false;
}
