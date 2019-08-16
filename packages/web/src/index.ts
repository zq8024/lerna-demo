import { Status, Person } from "@agp/core";

export function sayHello() {
    let p = new Person('jack');
    p.show();

    console.log(`status: ${Status.fail}`);
}

export function getStatusName(s: Status) {
    switch (s) {
        case Status.success:
            return '成功'
        case Status.fail:
            return '失败'
        case Status.login:
            return '需登录'
        default:
            break;
    }
}

export { Teacher } from './Teacher';