"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloController {
    constructor() {
        this.sayHello = (req, res) => {
            res.send("Life is good!");
        };
    }
}
exports.default = HelloController;
HelloController.helloController = null;
HelloController.getInstance = (app) => {
    if (HelloController.helloController === null) {
        HelloController.helloController = new HelloController();
        app.get("/hello", HelloController.helloController.sayHello);
    }
    return HelloController.helloController;
};
