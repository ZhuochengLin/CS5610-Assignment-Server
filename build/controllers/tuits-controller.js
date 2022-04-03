"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tuits_1 = __importDefault(require("./tuits"));
const custom_errors_1 = require("../error-handlers/custom-errors");
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
            newTuit._id = (new Date()).getTime() + "";
            newTuit.likes = 0;
            tuits.push(newTuit);
            res.json(newTuit);
        };
        this.findAllTuits = (req, res) => {
            res.json(tuits);
        };
        this.updateTuit = (req, res) => {
            const tuitId = req.params.tid;
            const updatedTuit = req.body;
            tuits = tuits.map(t => t._id === tuitId ? Object.assign(Object.assign({}, t), updatedTuit) : t);
            res.sendStatus(200);
        };
        this.deleteTuit = (req, res) => {
            const tuitId = req.params.tid;
            tuits = tuits.filter((t) => t._id != tuitId);
            res.sendStatus(200);
        };
    }
}
exports.default = TuitsController;
TuitsController.tuitsController = null;
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
