"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_controller_1 = __importDefault(require("./controllers/hello-controller"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const error_handler_1 = require("./error-handlers/error-handler");
const log_error_handler_1 = require("./error-handlers/log-error-handler");
const tuits_controller_1 = __importDefault(require("./controllers/tuits-controller"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
mongoose_1.default.connect(`${process.env.DB_URI}`, (err) => {
    if (err)
        throw err;
    console.log("MongoDB connected!");
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => { res.send("Welcome to Full Stack Development"); });
const helloController = hello_controller_1.default.getInstance(app);
const userController = user_controller_1.default.getInstance(app);
const tuitsController = tuits_controller_1.default.getInstance(app);
app.use(log_error_handler_1.LogErrors);
app.use(error_handler_1.ErrorHandler);
app.listen(process.env.PORT || 4000);
