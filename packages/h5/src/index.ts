import { sayHello, getStatusName, Teacher } from "@agp/web";
import { Status, Student } from '@agp/core';
import $ from 'jquery';

sayHello();

let s = getStatusName(Status.success);
console.log(s);

let te = new Teacher('jim');
te.show();
te.book();

let stu = new Student('tom');
stu.show();

$('body').append($('<div>test</div>'))




