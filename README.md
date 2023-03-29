
## CircularToJSON

#### circular-to-json is a JavaScript library that provides a way to convert circular data structures to JSON format, allowing you to serialize and store data in a format that can be easily transmitted and used by other applications.

#### With circular-to-json, you can easily convert JavaScript objects that contain circular references to a JSON string, without losing any of the data or structure. This is particularly useful when working with complex data structures, such as graphs, trees, and other recursive data types.

### The library provides two main functions:

- `stringify(obj, [replacer], [space]):` Converts an object to a JSON string, handling circular references with a replacer function that removes the circular 

- `parse(json, [reviver]):` Converts a JSON string to an object, handling circular references by restoring the original references.

The library is lightweight and easy to use, with no external dependencies. It works in both browser and Node.js environments, making it ideal for a wide range of applications.
# Installation

You can install using NPM or Yarn:

```bash
  npm i circular-to-json

```

```bash
  yarn add circular-to-json

```
# Usage

### `stringify` function:

```javascript
const CircularJSON = require('circular-json');

const obj = {
  prop1: "value1",
  prop2: "value2"
};

obj.circularRef = obj; // adding circular reference

const jsonString = CircularJSON.stringify(obj);
console.log(jsonString);

```

#### Output

```javascript
{"prop1":"value1","prop2":"value2","circularRef":{"[Circular]":""}}
```
### `parse` function:

```javascript
const jsonString = '{"prop1":"value1","prop2":"value2","circularRef":{"[Circular]":""}}';
const obj = CircularJSON.parse(jsonString);

console.log(obj.prop1); // Output: value1
console.log(obj.circularRef === obj); // Output: true

```
## Contributing

#### circular-to-json is an open-source project, and we welcome contributions from the community.

## Licence

#### CircularJSON is licensed under the `MIT License`.