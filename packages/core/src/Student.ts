import { Person } from './Person';

export class Student extends Person {
    constructor(public name: string) {
        super(name);
    }

    show() {
        if(process.env.preview){
            console.log(`it is preview`)
        }
        console.log(`student5: ${this.name}`)
    }
}
