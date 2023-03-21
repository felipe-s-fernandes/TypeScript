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
        if (!this.regex.test(data)) {
            throw new Error("O formato está errado");
        }
    }
    get regex() {
        return new RegExp("");
    }
}
export class EmailValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}
export class PasswordValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^\w{1,}$/gim;
    }
}
export class NameValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
}
