class Validator {
    constructor(argument) {
        this._data = argument;
    }
    get data() {
        return this._data;
    }
}
const myNumber = new Validator(123);
const myString = new Validator("string");
const myBoolean = new Validator(true);
const myVoid = new Validator((() => { })());
const myNull = new Validator(null);
const myUndefined = new Validator(undefined);
console.log("myNumber: ", myNumber.data, typeof myNumber.data);
console.log("myString: ", myString.data, typeof myString.data);
console.log("myBoolean: ", myBoolean.data, typeof myBoolean.data);
console.log("myVoid: ", myVoid.data, typeof myVoid.data);
console.log("myNull: ", myNull.data, typeof myNull.data);
console.log("myUndefined: ", myUndefined.data, typeof myUndefined.data);
