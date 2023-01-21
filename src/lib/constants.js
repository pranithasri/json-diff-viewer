export const isNumOrStringOrBoolean = (value) => {
    console.log("Value", value, typeof value, ["string", "boolean", "number"].includes(typeof value));
    return ["string", "boolean", "number"].includes(typeof value) || !value
}
export const openFlower = "{";
export const closeFlower = "}";
export const openSquare = "[";
export const closeSquare = "]";
