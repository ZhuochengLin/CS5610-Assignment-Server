"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const custom_errors_1 = require("../error-handlers/custom-errors");
let users = users_1.default;
class UserController {
    constructor() {
        this.findAllUsers = (req, res) => {
            const type = req.query.type;
            if (type) {
                res.json(this.findUsersByType(type));
                return;
            }
            res.json(users);
        };
        this.findUsersByType = (type) => {
            return users.filter((user) => user.type === type);
        };
        this.findUserById = (req, res) => {
            const userId = req.params.uid;
            const user = users.find(u => u._id === userId);
            res.json(user);
        };
        this.createUser = (req, res, next) => {
            const newUser = req.body;
            if (!newUser.username) {
                next(new custom_errors_1.EmptyUserError());
                return;
            }
            newUser._id = (new Date()).getTime() + "";
            users.push(newUser);
            res.json(newUser);
        };
        this.deleteUser = (req, res) => {
            const userId = req.params.uid;
            users = users.filter((u) => u._id !== userId);
            res.sendStatus(200);
        };
        this.updateUser = (req, res) => {
            const userId = req.params.uid;
            const updatedUser = req.body;
            users = users.map((u) => u._id === userId ? Object.assign(Object.assign({}, u), updatedUser) : u);
            res.sendStatus(200);
        };
    }
}
exports.default = UserController;
UserController.userController = null;
UserController.getInstance = (app) => {
    if (UserController.userController === null) {
        UserController.userController = new UserController();
        app.get("/api/users", UserController.userController.findAllUsers);
        app.get("/api/users/:uid", UserController.userController.findUserById);
        app.post("/api/users", UserController.userController.createUser);
        app.delete("/api/users/:uid", UserController.userController.deleteUser);
        app.put("/api/users/:uid", UserController.userController.updateUser);
    }
    return UserController.userController;
};
