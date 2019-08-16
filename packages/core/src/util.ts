

export const hasOwn = Object.prototype.hasOwnProperty;


export function add(a, b) {
    return a + b;
}

export function log(msg) {
    console.log(msg);
}

export class Person {
    constructor(public name: string) {

    }

    show() {
        console.log(`person6: ${this.name}`)
    }
}

export const enum Status {
    success,
    fail,
    login
}