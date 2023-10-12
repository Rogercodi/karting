import { NextFunction, Request, Response } from "express";

export class mainController {
    constructor() {};

    async getTest(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers)
        res.json({message: 'hello world'})
    }
}