"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This is a CircularJSON object that implements the interface defined above.
const CircularJSON = {
    // This is the stringify method that takes an object, a replacer function and a space (string or number) as arguments
    stringify(obj, replacer, space) {
        // This is a set that will be used to keep track of visited objects
        const visited = new WeakSet();
        // This is a recursive function that will convert the object to JSON, handling circular references.
        const toJSON = (val) => {
            // If the value is an object and is not null
            if (typeof val === "object" && val !== null) {
                // If the object has been visited before, return a stringified version of "[Circular]"
                if (visited.has(val)) {
                    return { "[Circular]": true };
                }
                // Add the object to the visited set
                visited.add(val);
                // If the value is an array, map over its elements and call toJSON on each of them
                if (Array.isArray(val)) {
                    return val.map(toJSON);
                }
                // Otherwise, create an empty object and copy each of the object's properties recursively
                const result = {};
                for (const key in val) {
                    result[key] = toJSON(val[key]);
                }
                return result;
            }
            // If the value is not an object, return it as is
            return val;
        };
        // If the replacer function is undefined, set it to a default function
        if (typeof replacer === "undefined") {
            replacer = (key, value) => {
                // If the value has been visited before, return a stringified version of "[Circular]" and the circular reference
                if (visited.has(value)) {
                    return { "[Circular]": true, circularRef: value };
                }
                // Otherwise, return the value as is
                return value;
            };
        }
        // Convert the object to JSON and return the resulting string
        return JSON.stringify(toJSON(obj), replacer, space);
    },
    // This is the parse method that takes a JSON string and a reviver function as arguments
    parse(text, reviver) {
        // Create a new WeakMap to store visited objects
        const visited = new WeakMap();
        // Define a reviver function that replaces circular references
        const reviverFn = (key, val) => {
            if (typeof val === "object" && val !== null && val["[Circular]"]) {
                return visited.get(val);
            }
            return val;
        };
        // Parse the JSON string and apply the reviver function
        const obj = JSON.parse(text, reviverFn);
        // Define a function to traverse the parsed object
        const traverse = (node, path) => {
            if (typeof node === "object" && node !== null) {
                if (visited.has(node)) {
                    // If the object has already been visited, replace it with a circular reference
                    path[path.length - 1][path[path.length - 1].length - 1] = {
                        "[Circular]": visited.get(node),
                    };
                    return;
                }
                // Add the object to the visited set
                visited.set(node, path);
                if (Array.isArray(node)) {
                    // If the object is an array, traverse its elements
                    node.forEach((child, i) => traverse(child, path.concat([i])));
                }
                else {
                    // If the object is an object, traverse its keys
                    Object.keys(node).forEach((key) => traverse(node[key], path.concat([key])));
                }
            }
        };
        // Traverse the parsed object starting with an empty path
        traverse(obj, []);
        // Return the parsed object
        return JSON.parse(text, reviver);
    },
    stringifyAndParse(obj, replacer, space) {
        const str = this.stringify(obj, replacer, space);
        return this.parse(str);
    },
};
exports.default = CircularJSON;
