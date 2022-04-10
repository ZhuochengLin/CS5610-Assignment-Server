import {Express, NextFunction, Request, Response} from "express";
import posts from "./tuits";
import {EmptyTuitError, EmptyUserError} from "../error-handlers/custom-errors";
import TuitsDao from "../daos/TuitsDao";
let tuits = posts;

export default class TuitsController {

    private static tuitsController: TuitsController | null = null;
    private static tuitsDao: TuitsDao = TuitsDao.getInstance();

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

    createTuit = (req: Request, res: Response, next: NextFunction) => {
        const newTuit = req.body;
        if (!newTuit.postedBy) {
            next(new EmptyUserError());
            return;
        }
        if (!newTuit.tuit) {
            next(new EmptyTuitError());
            return;
        }
        TuitsController.tuitsDao.createTuit(newTuit)
            .then(tuit => res.json(tuit))
            .catch(next);
    }

    findAllTuits = (req: Request, res: Response) => {
        TuitsController.tuitsDao.findAllTuits().then(tuits => res.json(tuits));
    }

    updateTuit = (req: Request, res: Response, next: NextFunction) => {
        const tuitId = req.params.tid;
        const updatedTuit = req.body;
        TuitsController.tuitsDao.updateTuit(tuitId, updatedTuit)
            .then(status => res.json(status))
            .catch(next);
    }

    deleteTuit = (req: Request, res: Response, next: NextFunction) => {
        const tuitId = req.params.tid;
        TuitsController.tuitsDao.deleteTuit(tuitId)
            .then(status => res.json(status))
            .catch(next)
    }

}