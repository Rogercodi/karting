import { NextFunction, Request, Response } from "express";
import { ClientSqlRepositories, IClientRepositories } from "../database/ddbbFacade/clientRepositories";
import { UserApp } from "../Repositories/appUser";

export class SignupController {
    
    private repositories: IClientRepositories;

    constructor() {
        this.repositories = new ClientSqlRepositories()
    }

    public async postUser(req: Request, res: Response, next: NextFunction) {

        try {
            let user: UserApp = req.body;
            console.log(user);
            user = {
                ...user,
                role: 'COMMON_USER',
                registerDate: new Date()
            }
            const result = await this.repositories.postUser(user);
            res.json({result, message: 'Usuario registrado correctamente'})
           
        } catch (error) {
            console.error('Signup Controller Error', error);
            res.json({message: 'El usuario o el email ya estan registrados'})
            next()
        }
    }
}