import { IUser } from "./interfaces.js";

class Validator {
    protected _data: any;
    constructor(data: any) {
        this._data = data;
    }

    get data(): any {
        return this._data;
    }
}

class StringValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "string") {
            throw new Error("Invalid credential(s) type(s)");
        }
        super(data);
    }
}

abstract class RegexValidator extends StringValidator {
    constructor(data: any) {
        super(data);
        if (!this.regex.test(data)) {
            throw new Error("Invalid credential(s)");
        }
    }

    get regex(): RegExp {
        return new RegExp("");
    }
}

class EmailValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
    }

    get regex(): RegExp {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}

class PasswordValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
    }

    get regex(): RegExp {
        return /^\w{1,}$/gim;
    }
}

class NameValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
    }

    get regex(): RegExp {
        return /^[a-z]{1,}$/gim;
    }
}

// Validate the inputs: if there are invalid inputs, return true to abort the program
export function validateUser(user: Partial<IUser>) {
    try {
        if (user.email) new EmailValidator(user.email);
        if (user.name) new NameValidator(user.name);
        if (user.password) new PasswordValidator(user.password);
    } catch (error) {
        return true;
    }
    return false;
}
