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
    logString() {
        console.log(this._data);
    }
}
class NumberValidator extends Validator {
    constructor(data) {
        if (typeof data !== "number") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
    logNumber() {
        console.log(this._data);
    }
}
class BooleanValidator extends Validator {
    constructor(data) {
        if (typeof data !== "boolean") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
    logBoolean() {
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
