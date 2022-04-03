import {Express, Request, Response} from "express";
import posts from "./tuits";
import {EmptyTuitError, EmptyUserError} from "../error-handlers/custom-errors";
let tuits = posts;

export default class TuitsController {

    private static tuitsController: TuitsController | null = null;

    public static getInstance = (app: Express) => {
        if (TuitsController.tuitsController === null) {
            TuitsController.tuitsController = new TuitsController();
            app.post("/api/tuits", TuitsController.tuitsController.createTuit);
            app.get("/api/tuits", TuitsController.tuitsController.findAllTuits);
            app.put("/api/tuits/:tid", TuitsController.tuitsController.updateTuit);
            app.delete("/api/tuits/:tid", TuitsController.tuitsController.deleteTuit);
        }
        return TuitsController.tuitsController;
    }

    createTuit = (req: Request, res: Response, next: Function) => {
        const newTuit = req.body;
        if (!newTuit.postedBy) {
            next(new EmptyUserError());
            return;
        }
        if (!newTuit.tuit) {
            next(new EmptyTuitError());
            return;
        }
        newTuit._id = (new Date()).getTime() + "";
        newTuit["stats"]["likes"] = 0;
        newTuit["stats"]["replies"] = 0;
        newTuit["stats"]["retuits"] = 0;
        tuits.push(newTuit);
        res.json(newTuit);
    }

    findAllTuits = (req: Request, res: Response) => {
        res.json(tuits);
    }

    updateTuit = (req: Request, res: Response) => {
        const tuitId = req.params.tid;
        const updatedTuit = req.body;
        tuits = tuits.map(t => t._id === tuitId ? {...t, ...updatedTuit} : t);
        res.sendStatus(200);
    }

    deleteTuit = (req: Request, res: Response) => {
        const tuitId = req.params.tid;
        tuits = tuits.filter((t) => t._id != tuitId);
        res.sendStatus(200);
    }

}