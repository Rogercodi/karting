import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware')
    if(!req.headers['authorization']) {
        console.log('no headers')
        return res.json({error: 'No hay cabecera'})
    }

    try {
    let token = req.headers['authorization']
    let verify = jwt.verify(token, 'karting_app')
    console.log(verify, 'VERIFY', token)
    next();

    } catch (error) {
    console.log('MIDDLEWARE ERROR', error)
    next();        
    }
}