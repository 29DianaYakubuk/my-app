import { set } from "react-hook-form";

export const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, delay, ...args);
    };
};
