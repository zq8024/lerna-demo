import { Person } from './Person';

export class Employe extends Person {
    constructor(name) {
        super(name);
    }

    show() {
        console.log(`employe: ${this.name}`)
    }
}