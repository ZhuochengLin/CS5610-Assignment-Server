"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tuits_1 = __importDefault(require("./tuits"));
const custom_errors_1 = require("../error-handlers/custom-errors");
const TuitsDao_1 = __importDefault(require("../daos/TuitsDao"));
let tuits = tuits_1.default;
class TuitsController {
    constructor() {
        this.createTuit = (req, res, next) => {
            const newTuit = req.body;
            if (!newTuit.postedBy) {
                next(new custom_errors_1.EmptyUserError());
                return;
            }
            if (!newTuit.tuit) {
                next(new custom_errors_1.EmptyTuitError());
                return;
            }
            TuitsController.tuitsDao.createTuit(newTuit)
                .then(tuit => res.json(tuit))
                .catch(next);
        };
        this.findAllTuits = (req, res) => {
            TuitsController.tuitsDao.findAllTuits().then(tuits => res.json(tuits));
        };
        this.updateTuit = (req, res, next) => {
            const tuitId = req.params.tid;
            const updatedTuit = req.body;
            TuitsController.tuitsDao.updateTuit(tuitId, updatedTuit)
                .then(status => res.json(status))
                .catch(next);
        };
        this.deleteTuit = (req, res, next) => {
            const tuitId = req.params.tid;
            TuitsController.tuitsDao.deleteTuit(tuitId)
                .then(status => res.json(status))
                .catch(next);
        };
    }
}
exports.default = TuitsController;
TuitsController.tuitsController = null;
TuitsController.tuitsDao = TuitsDao_1.default.getInstance();
TuitsController.getInstance = (app) => {
    if (TuitsController.tuitsController === null) {
        TuitsController.tuitsController = new TuitsController();
        app.post("/api/tuits", TuitsController.tuitsController.createTuit);
        app.get("/api/tuits", TuitsController.tuitsController.findAllTuits);
        app.put("/api/tuits/:tid", TuitsController.tuitsController.updateTuit);
        app.delete("/api/tuits/:tid", TuitsController.tuitsController.deleteTuit);
    }
    return TuitsController.tuitsController;
};
