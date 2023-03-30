import { EmailValidator, NameValidator, PasswordValidator, } from "./validators.js";
export class EmailInput extends HTMLElement {
    constructor() {
        super(); //call to HTMLElement constructor
        this.value = "";
        const shadow = this.attachShadow({ mode: "open" }); //attaches new HTMLElement to shadowRoot (open means the element and its children can be queried from outside the shadow DOM)
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => {
            try {
                new EmailValidator(input.value);
                this.value = input.value;
            }
            catch (error) {
                alert(error);
                input.value = "";
                this.value = "";
            }
        };
        shadow.append(input);
    }
}
export class PasswordInput extends HTMLElement {
    constructor() {
        super(); //call to HTMLElement constructor
        this.value = "";
        const shadow = this.attachShadow({ mode: "open" }); //attaches new HTMLElement to shadowRoot (open means the element and its children can be queried from outside the shadow DOM)
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => {
            try {
                new PasswordValidator(input.value);
                this.value = input.value;
            }
            catch (error) {
                alert(error);
                input.value = "";
                this.value = "";
            }
        };
        shadow.append(input);
    }
}
export class NameInput extends HTMLElement {
    constructor() {
        super(); //call to HTMLElement constructor
        this.value = "";
        const shadow = this.attachShadow({ mode: "open" }); //attaches new HTMLElement to shadowRoot (open means the element and its children can be queried from outside the shadow DOM)
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => {
            try {
                new NameValidator(input.value);
                this.value = input.value;
            }
            catch (error) {
                alert(error);
                input.value = "";
                this.value = "";
            }
        };
        shadow.append(input);
    }
}
