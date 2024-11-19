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

## Step 2: Implement createElement & createRoot

The function createElement is called this way in reference to another function: `document.createElement(tag: string): Element`. This standard function that takes a tag name and return a new html element node.

You can then call `element.setAttribute(name, value)` to add attributes to the element.

Let's wrote a first naive version:

```js
export const createElement = (elementType, options, ...children) => {
    const el = document.createElement(elementType);

    for (const [attrName, attrValue] of Object.entries(options)) {
        el.setAttribute(attrName, attrValue);
    }

    return el;
};
```

This version works if the elementType is a string like `div`. However, we know elementType is likely to be one of our react component function. In this case we will simply execute the function and return it's result. Indeed, your react component function always returns html tags to render, html tag that will call createElement and thus return html element.

```js
export const createElement = (elementType, options, ...children) => {
    if (typeof elementType === 'function') {
        return elementType(options);
    }
```

The childrens need to be added to our element, they can either be a string or an HTML element or an array of them. Indeed, it will never be a React component because the React component would have already been processed by createElement which returns an HTML element.

```js
for (const child of children) {
    // ex: <div>Children text</div>
    if (typeof child === 'string') {
        const tn = document.createTextNode(child);
        el.appendChild(tn);
    }
    // ex: <div><span></span></div>
    // ex: <div><MyElement></MyElement></div>
    // The inside span/MyElement is processed first so we actually receive
    // an html element
    else if (child instanceof HTMLElement) {
        el.appendChild(child);
    }
```

Our `createElement` function already handle most cases, we can now write `createRoot` and see our application. For now, `createRoot` simply takes an HTML element and adds a child to it when render is called.

```js
export const createRoot = (rootEl) => ({
    render: (childEl) => {
        console.log(rootEl, childEl);
        rootEl.appendChild(childEl);
    }
});
```

And TA-DA !

![step2](doc/assets/step2.png)

Ok, it's an humble start, let's handle the `className` special case before going into the next step to add style to our components.

```js
for (const [attrName, attrValue] of Object.entries(options)) {
        if (attrName === 'className') {
            el.setAttribute('class', attrValue);
        }
```

![step2classname](doc/assets/step2classname.png)
