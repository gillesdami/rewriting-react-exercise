# Rewriting react

This repository offers a step by step tutorial on how to rewrite some react functionalities to better understand what they do behind the scene.

It does not aim to reproduce any react optimization.

You can jump to any step of this exercise by running `git checkout stepX`.

## Requirements

nodejs and yarn.

```sh
yarn # install the deps
yarn start # run a dev server
```

## Step 0: Explore

Explore this basic to do app while it displays correctly, and go to the next step with `git checkout step1` to see how we will replace react with our custom version.

## Step 1: Our react lib

First we will create a react.js file, this is our custom react library.

```js
// src/react.js
export const createRoot = () => ({ render: () => {} });
export const createElement = () => {};
export const useState = () => {};
export const useCallback = () => {};

export default {
    createRoot,
    createElement,
    useState,
    useCallback
};
```

We will also replace in the project all `from 'react';` to import our react.js file and slightly change index.jsx to remove the dependency to react-dom.

```js
// index.jsx
import React, { createRoot } from './react';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
    <App/>
);
```

You may have noticed we defined the function createElement. You may not know it, yet this is the function you use the most and by far the most important of the react api.

JS does not have html tags, react team created an extention of JS that allows us to write things such as `<App/>` or `<div id="mydiv">hi<div/>` in our JSX files. This is the role of the compiler to make it a valid JS. To do so, the compiler simply replaces the tag with a call to React.createElement. The translation of `<div id="mydiv">hi<div/>` in js is:

```js
React.createElement("div", { id: "mydiv" }, "hi")
```

And `<MyComponent><div id="mydiv">hi<div/></MyComponent>` becomes:

```js
React.createElement(
    MyComponent,
    {},
    React.createElement(
        "div",
        { id: "mydiv" },
        "hi"
    )
)
```

Their is no magic:

 - the tag name or function is passed as the first parameter
 - the second parameter is an object that contains the html attributes
 - the next parameters are the children of the html tag.

Currently, the projects builds, It obviously does nothing, but it builds.
In the next step, we will code a first version of createElement and createRoot to see how react uses those functions to create HTML elements.
