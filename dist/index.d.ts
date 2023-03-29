interface CircularJSON {
    stringify(obj: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
    parse(text: string, reviver?: (key: any, value: any) => any): any;
    stringifyAndParse(obj: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
}
declare const CircularJSON: CircularJSON;
export default CircularJSON;
