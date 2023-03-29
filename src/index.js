"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CircularJSON = {
    stringify: function (obj, replacer, space) {
        var visited = new WeakMap();
        var toJSON = function (val) {
            if (typeof val === "object" && val !== null) {
                if (visited.has(val)) {
                    return { "[Circular]": visited.get(val) };
                }
                visited.set(val, []);
            }
            return val;
        };
        return JSON.stringify(toJSON(obj), replacer, space);
    },
    parse: function (json, reviver) {
        var visited = new WeakMap();
        var reviverFn = function (key, val) {
            if (typeof val === "object" && val !== null && val["[Circular]"]) {
                return visited.get(val["[Circular]"]);
            }
            return val;
        };
        var obj = JSON.parse(json, reviverFn);
        var traverse = function (node, path) {
            if (typeof node === "object" && node !== null) {
                if (visited.has(node)) {
                    var parentPath = visited.get(node);
                    var lastKey = parentPath[parentPath.length - 1];
                    var parent_1 = parentPath.slice(0, -1).reduce(function (acc, key) { return acc[key]; }, obj);
                    parent_1[lastKey] = { "[Circular]": parent_1[lastKey] };
                    return;
                }
                visited.set(node, path);
                if (Array.isArray(node)) {
                    node.forEach(function (child, i) { return traverse(child, path.concat(i)); });
                }
                else {
                    Object.keys(node).forEach(function (key) {
                        return traverse(node[key], path.concat(key));
                    });
                }
            }
        };
        traverse(obj, []);
        return JSON.parse(json, reviver);
    },
};
exports.default = CircularJSON;
//# sourceMappingURL=index.js.map