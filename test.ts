function identity<Type>(arg: Type): Type {
    return arg;
}

const output = identity(document.createElement("input").value);
