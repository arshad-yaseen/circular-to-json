interface CircularJSON {
  stringify(obj: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
  parse(text: string, reviver?: (key: any, value: any) => any): any;
}

const CircularJSON: CircularJSON = {
  stringify(obj: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
    const visited = new WeakSet();
    const toJSON = (val: any): any => {
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
  parse(text: string, reviver?: (key: any, value: any) => any): any {
    const visited = new WeakMap();
    const reviverFn = (key: any, val: any): any => {
      if (typeof val === "object" && val !== null && val["[Circular]"]) {
        return visited.get(val);
      }
      return val;
    };
    const obj = JSON.parse(text, reviverFn);
    const traverse = (node: any, path: Array<any>): void => {
      if (typeof node === "object" && node !== null) {
        if (visited.has(node)) {
          path[path.length - 1][path[path.length - 1].length - 1] = { "[Circular]": visited.get(node) };
          return;
        }
        visited.set(node, path);
        if (Array.isArray(node)) {
          node.forEach((child, i) => traverse(child, path.concat([i])));
        } else {
          Object.keys(node).forEach((key) => traverse(node[key], path.concat([key])));
        }
      }
    };
    traverse(obj, []);
    return JSON.parse(text, reviver);
  },
};

export default CircularJSON;
