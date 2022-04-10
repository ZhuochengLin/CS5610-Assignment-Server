import mongoose from "mongoose";
import Tuit from "../models/Tuit";

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: String,
    postedBy: {
        username: String
    },
    stats: {
        replies: Number,
        likes: Number,
        dislikes: Number,
        retuits: Number
    }
}, {collection: "tuits"});
export default TuitSchema;