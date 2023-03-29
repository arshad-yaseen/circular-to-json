interface CircularJSON {
    stringify(obj: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
    parse(text: string, reviver?: (key: any, value: any) => any): any;
}
declare const CircularJSON: CircularJSON;
export default CircularJSON;
