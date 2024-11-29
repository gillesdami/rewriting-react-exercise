let cursor = ''; // .App.Header.useState.useState
let createFirstElement;
let root;
let isOutdated = false;
const cache = {};
const depCache = {};

const redrawLoop = () => {
    if (isOutdated) {
        isOutdated = false;
        cursor = '';
        root.removeChild(root.firstChild);
        root.appendChild(createFirstElement());
    }

    setTimeout(redrawLoop, 10);
};

export const createRoot = (rootEl) => {
    root = rootEl;

    return {
        render: (childEl) => {
            rootEl.appendChild(childEl);
            redrawLoop();
        }
    }
};

export const createElement = (elementType, options, ...children) => {
    if (!createFirstElement) {
        createFirstElement = () => createElement(elementType, options, ...children);
    }

    if (typeof elementType === 'function') {
        cursor += '.' + elementType.name;
        return elementType(options);
    }

    const el = document.createElement(elementType);

    for (const [attrName, attrValue] of Object.entries(options)) {
        if (attrName === 'className') {
            el.setAttribute('class', attrValue);
        }
        else if (attrName.startsWith('on')) {
            const evt = attrName.slice(2).toLocaleLowerCase();
            el.addEventListener(evt, attrValue);
        }
        else if (attrName == 'defaultChecked') {
            el.checked = options['checked'] ?? attrValue;
        }
        else if (attrName == 'defaultValue') {
            el.value = options['value'] ?? attrValue;
        }
        else {
            el.setAttribute(attrName, attrValue);
        }
    }

    for (const child of children.flat()) {
        // ex: <div>Children text</div>
        if (typeof child === 'string') {
            const tn = document.createTextNode(child);
            el.appendChild(tn);
        }
        // ex: <div><span></span></div>
        // ex: <div><MyElement></MyElement></div>
        else if (child instanceof HTMLElement) {
            el.appendChild(child);
        }
    }

    return el;
};

export const useState = (defaultValue) => {
    cursor += '.useState';
    cache[cursor] = cache[cursor] ?? defaultValue;

    return [
        cache[cursor],
        ((cursor) => (valueOrcb) => {
            if (typeof valueOrcb === 'function') {
                cache[cursor] = valueOrcb(cache[cursor]);
            } else {
                cache[cursor] = valueOrcb;
            }

            isOutdated = true;
        })(cursor)
    ];
};

export const useCallback = (cb, deps) => {
    cursor += '.useCallback';

    if (depCache[cursor]?.length !== deps.length
        || deps.some((dep, i) => dep !== depCache[cursor][i])) {
        cache[cursor] = cb;
        depCache[cursor] = deps;
    }

    return cache[cursor];
};

export default {
    createRoot,
    createElement,
    useState,
    useCallback
};
