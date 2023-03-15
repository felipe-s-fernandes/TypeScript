type MyUnionType = number | string | boolean | void | null | undefined;

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

    logString(): void {
        console.log(this._data);
    }
}

class NumberValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "number") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }

    logNumber(): void {
        console.log(this._data);
    }
}

class BooleanValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "boolean") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }

    logBoolean(): void {
        console.log(this._data);
    }
}

const string = new StringValidator("string");
string.data;
string.logString();

const number = new NumberValidator(123);
number.logNumber();

const boolean = new BooleanValidator(true);
boolean.logBoolean();
