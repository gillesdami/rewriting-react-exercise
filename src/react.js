export const createRoot = (rootEl) => ({
    render: (childEl) => {
        rootEl.appendChild(childEl);
    }
});

export const createElement = (elementType, options, ...children) => {
    if (typeof elementType === 'function') {
        return elementType(options)
    }

    const el = document.createElement(elementType);

    for (const [attrName, attrValue] of Object.entries(options)) {
        if (attrName === 'className') {
            el.setAttribute('class', attrValue);
        }

        el.setAttribute(attrName, attrValue);
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

export const useState = () => [undefined, () => {}];

export const useCallback = () => (() => {});

export default {
    createRoot,
    createElement,
    useState,
    useCallback
};
