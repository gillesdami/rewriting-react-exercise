export const createRoot = () => ({ render: () => {} });
export const createElement = () => {};
export const useState = () => [undefined, () => {}];
export const useCallback = () => (() => {});

export default {
    createRoot,
    createElement,
    useState,
    useCallback
};
