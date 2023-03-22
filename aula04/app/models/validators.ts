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
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}

class NumberValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "number") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}

class BooleanValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "boolean") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}

abstract class RegexValidator extends StringValidator {
    constructor(data: any) {
        super(data);
        if (!this.regex.test(data)) {
            throw new Error("O formato está errado");
        }
    }

    get regex(): RegExp {
        return new RegExp("");
    }
}

export class EmailValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
    }

    get regex(): RegExp {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}

export class PasswordValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
    }

    get regex(): RegExp {
        return /^\w{1,}$/gim;
    }
}

export class NameValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
    }

    get regex(): RegExp {
        return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
    }
}
