import {Express, NextFunction, Request, Response} from "express";
import people from "./users";
import {EmptyUserError} from "../error-handlers/custom-errors";
let users = people;

export default class UserController {

    private static userController: UserController | null = null;

    public static getInstance = (app: Express) => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
            app.put("/api/users/:uid", UserController.userController.updateUser);
        }
        return UserController.userController;
    }

    findAllUsers = (req: any, res: Response) => {
        const type = req.query.type;
        if (type) {
            res.json(this.findUsersByType(type));
            return;
        }
        res.json(users);
    }

    findUsersByType = (type: string) => {
        return users.filter((user) => user.type === type);
    }

    findUserById = (req: Request, res: Response) => {
        const userId = req.params.uid;
        const user = users.find(u => u._id === userId);
        res.json(user);
    }

    createUser = (req: Request, res: Response, next: NextFunction) => {
        const newUser = req.body;
        if (!newUser.username) {
            next(new EmptyUserError());
            return
        }
        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    deleteUser = (req: Request, res: Response) => {
        const userId = req.params.uid;
        users = users.filter((u) => u._id !== userId);
        res.sendStatus(200);
    }

    updateUser = (req: Request, res: Response) => {
        const userId = req.params.uid;
        const updatedUser = req.body;
        users = users.map((u) => u._id === userId ? {...u, ...updatedUser} : u);
        res.sendStatus(200);
    }

}