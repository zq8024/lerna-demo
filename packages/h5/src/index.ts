import { sayHello, getStatusName, Teacher } from "@agp/web";
import { Status } from '@agp/core';

sayHello();

let s = getStatusName(Status.success);
console.log(s);

let te = new Teacher('jim');
te.show();
te.book();




