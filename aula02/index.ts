type MyUnionType = number | string | boolean | void | null | undefined;

class Validator {
    public data: any;
    constructor(data: any) {
        this.data = data;
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

const string = new StringValidator("string");
console.log(string.data);

const number = new NumberValidator(123);
console.log(number.data);

const boolean = new BooleanValidator(true);
console.log(boolean.data);
