import express, {Request, Response} from "express";
import HelloController from "./controllers/hello-controller";
import UserController from "./controllers/user-controller";
import {ErrorHandler} from "./error-handlers/error-handler";
import {LogErrors} from "./error-handlers/log-error-handler";
import TuitsController from "./controllers/tuits-controller";
import cors from "cors";
import {config} from "dotenv";
import mongoose from "mongoose";

config();
const app = express();
mongoose.connect(`${process.env.DB_URI}`, (err) => {
    if (err) throw err;
    console.log("MongoDB connected!")
});
app.use(express.json());
app.use(cors())
app.get("/", (req: Request, res: Response) => {res.send("Welcome to Full Stack Development")});

const helloController = HelloController.getInstance(app);
const userController = UserController.getInstance(app);
const tuitsController = TuitsController.getInstance(app);

app.use(LogErrors);
app.use(ErrorHandler);
app.listen(process.env.PORT || 4000);