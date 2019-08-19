import { Person } from "@agp/core";


export class Teacher extends Person {

    constructor(name: string) {
        super(name);
    }

    book() {
        console.log('it is book22');
    }
}