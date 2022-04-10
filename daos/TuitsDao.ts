import tuitModel from "../mongoose/TuitModel";
import Tuit from "../models/Tuit";

export default class TuitsDao {

    private static tuitsDao: TuitsDao | null = null;

    private constructor() {
    }

    public static getInstance = () => {
        if (TuitsDao.tuitsDao === null) {
            TuitsDao.tuitsDao = new TuitsDao();
        }
        return TuitsDao.tuitsDao;
    }

    findAllTuits = async () => {
        return tuitModel.find();
    };

    createTuit = async (tuit: Tuit) => {
        return tuitModel.create(tuit);
    };

    deleteTuit = async (tid: string) => {
        return tuitModel.deleteOne({_id: tid});
    };

    updateTuit = async (tid: string, tuit: Tuit) => {
        return tuitModel.updateOne({_id: tid}, {$set: tuit});
    };

}