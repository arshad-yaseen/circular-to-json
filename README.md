
# Circular-to-JSON

#### Circular-to-JSON is a small package that allows you to safely stringify and parse objects with circular references using the JSON format. This package is written in TypeScript.
## Installation

You can install using NPM or Yarn:

```bash
  npm i circular-to-json

```

```bash
  yarn add circular-to-json

```
## Simple Usage

#### This package exports a `CircularJSON` object with two methods: `stringify`, `parse` and `stringifyAndParse`. Here's how you can use them:

## Stringify

```javascript
import { CircularJSON } from 'circular-to-json';

const obj = { a: 1 };
obj.b = obj; // adding circular reference

const jsonString = CircularJSON.stringify(obj);

console.log(jsonString)

```

#### Output

```javascript
'{"a":1,"b":{"[Circular]":true}}'
```

## Parse

```javascript
const jsonString = CircularJSON.stringify(obj);
const parsedObj = CircularJSON.parse(jsonString);
console.log(parsedObj)
```

#### Output

```javascript
{ a: 1, b: [Circular] }
```

## stringifyAndParse

#### `stringifyAndParse` method that combines the `stringify` and `parse` methods into a single operation.

```javascript
const obj = { a: 1 };
obj.b = obj;

const parsedObj = CircularJSON.stringifyAndParse(obj);

```

#### Output

```javascript
{ a: 1, b: [Circular] }
```
## Other Usage

#### The `stringify` method takes an optional `replacer` function and an optional `space` parameter, which work the same way as the corresponding parameters in `JSON.stringify`.

## stringify - space

```javascript
const obj = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345"
  }
};

// Set the space parameter to '\t' to use a tab for indentation

const jsonStrWithTab = CircularJSON.stringify(obj, undefined, '\t');
console.log(jsonStrWithTab);

```

#### Output

```javascript
{
  "name": "John",
  "age": 30,
	"hobbies": [
		"reading",
		"running",
		"cooking"
	],
	"address": {
		"street": "123 Main St",
		"city": "Anytown",
		"state": "CA",
		"zip": "12345"
	}
}

```

## stringify - replacer

```javascript
const obj = {
  name: "Alice",
  age: 30,
  children: [
    { name: "Bob", age: 5 },
    { name: "Charlie", age: 3 },
  ],
};

// Define a replacer function that converts all numbers to strings
const replacer = (key, value) => {
  if (typeof value === "number") {
    return value.toString();
  }
  return value;
};

const jsonString = CircularJSON.stringify(obj, replacer);

console.log(jsonString);

```

#### Output

```javascript
{
  "name": "Alice",
  "age": "30",
  "children": [
    {
      "name": "Bob",
      "age": "5"
    },
    {
      "name": "Charlie",
      "age": "3"
    }
  ]
}
```

## parse - reviver

#### The `parse` method takes an optional `reviver` function, which works the same way as the corresponding parameter in `JSON.parse`.

```javascript
const jsonString = '{"name":"John Smith","age":30,"car":{"model":"Tesla","year":2022}}';

const reviver = (key, value) => {
  if (typeof value === 'string' && key !== '') {
    return value.toUpperCase(); // convert all string values (except the root object) to uppercase
  }
  return value; // otherwise return the original value
}

const obj = JSON.parse(jsonString, reviver);

console.log(obj);


```

#### Output

```javascript
{
  "name": "JOHN SMITH",
  "age": 30,
  "car": {
    "model": "TESLA",
    "year": 2022
  }
}

```
### Contributing

#### circular-to-json is an open-source project, and we welcome contributions from the community.

### Licence

#### CircularJSON is licensed under the `MIT License`.