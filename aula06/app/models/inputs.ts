import {
    EmailValidator,
    NameValidator,
    PasswordValidator,
} from "./validators.js";

export class EmailInput extends HTMLElement {
    public value: string = "";

    constructor() {
        super(); //call to HTMLElement constructor

        const shadow = this.attachShadow({ mode: "open" }); //attaches new HTMLElement to shadowRoot (open means the element and its children can be queried from outside the shadow DOM)
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => {
            try {
                new EmailValidator(input.value);
                this.value = input.value;
            } catch (error) {
                alert(error);
                input.value = "";
                this.value = "";
            }
        };
        shadow.append(input);
    }
}

export class PasswordInput extends HTMLElement {
    public value: string = "";

    constructor() {
        super(); //call to HTMLElement constructor

        const shadow = this.attachShadow({ mode: "open" }); //attaches new HTMLElement to shadowRoot (open means the element and its children can be queried from outside the shadow DOM)
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => {
            try {
                new PasswordValidator(input.value);
                this.value = input.value;
            } catch (error) {
                alert(error);
                input.value = "";
                this.value = "";
            }
        };
        shadow.append(input);
    }
}

export class NameInput extends HTMLElement {
    public value: string = "";

    constructor() {
        super(); //call to HTMLElement constructor

        const shadow = this.attachShadow({ mode: "open" }); //attaches new HTMLElement to shadowRoot (open means the element and its children can be queried from outside the shadow DOM)
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => {
            try {
                new NameValidator(input.value);
                this.value = input.value;
            } catch (error) {
                alert(error);
                input.value = "";
                this.value = "";
            }
        };
        shadow.append(input);
    }
}
