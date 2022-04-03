import {Request, Response, NextFunction} from "express";

export function LogErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    next(err);
}