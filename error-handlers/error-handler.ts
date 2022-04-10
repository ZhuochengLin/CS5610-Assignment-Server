import {Request, Response, NextFunction} from "express";

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(403).send({success: false, error: err.message});
}