"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CircularJSON = {
    stringify(obj, replacer, space) {
        const visited = new WeakSet();
        const toJSON = (val) => {
            if (typeof val === "object" && val !== null) {
                if (visited.has(val)) {
                    return { "[Circular]": true };
                }
                visited.add(val);
            }
            return val;
        };
        return JSON.stringify(toJSON(obj), replacer, space);
    },
    parse(text, reviver) {
        const visited = new WeakMap();
        const reviverFn = (key, val) => {
            if (typeof val === "object" && val !== null && val["[Circular]"]) {
                return visited.get(val);
            }
            return val;
        };
        const obj = JSON.parse(text, reviverFn);
        const traverse = (node, path) => {
            if (typeof node === "object" && node !== null) {
                if (visited.has(node)) {
                    path[path.length - 1][path[path.length - 1].length - 1] = { "[Circular]": visited.get(node) };
                    return;
                }
                visited.set(node, path);
                if (Array.isArray(node)) {
                    node.forEach((child, i) => traverse(child, path.concat([i])));
                }
                else {
                    Object.keys(node).forEach((key) => traverse(node[key], path.concat([key])));
                }
            }
        };
        traverse(obj, []);
        return JSON.parse(text, reviver);
    },
};
exports.default = CircularJSON;
