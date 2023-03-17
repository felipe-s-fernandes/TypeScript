"use strict";
class Validator {
    constructor(data) {
        this._data = data;
    }
    get data() {
        return this._data;
    }
}
class StringValidator extends Validator {
    constructor(data) {
        if (typeof data !== "string") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class NumberValidator extends Validator {
    constructor(data) {
        if (typeof data !== "number") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class BooleanValidator extends Validator {
    constructor(data) {
        if (typeof data !== "boolean") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class RegexValidator extends StringValidator {
    constructor(data) {
        super(data);
        this.regexp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        if (!this.regexp.test(data)) {
            throw new Error("O formato está errado");
        }
    }
}
class EmailInput extends HTMLElement {
    constructor() {
        super(); //call to HTMLElement constructor
        const shadow = this.attachShadow({ mode: "open" }); //attaches new HTMLElement to shadowRoot (open means the element and its children can be queried from outside the shadow DOM)
        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => new RegexValidator(input.value); //validates expression through a new RegexValidator instance
        shadow.append(input);
    }
}
customElements.define("email-input", EmailInput); //defines the EmailInput custom element on page load.
