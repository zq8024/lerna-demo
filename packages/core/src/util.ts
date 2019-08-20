

export const hasOwn = Object.prototype.hasOwnProperty;


export function add(a, b) {
    return a + b;
}

export function log(msg) {
    console.log(msg);
}


export const enum Status {
    success,
    fail,
    login
}
