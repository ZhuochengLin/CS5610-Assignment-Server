import {Express, Request, Response} from "express";

export default class HelloController {

    private static helloController: HelloController | null = null;

    public static getInstance = (app: Express) => {
        if (HelloController.helloController === null) {
            HelloController.helloController = new HelloController();
            app.get("/hello", HelloController.helloController.sayHello);
        }
        return HelloController.helloController;
    }

    sayHello = (req: Request, res: Response) => {
        res.send("Life is good!");
    }

}