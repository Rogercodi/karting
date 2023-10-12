import { NextFunction, Request, Response } from "express";
import { UserApp } from "../Repositories/appUser";
import { ClientSqlRepositories, IClientRepositories } from "../database/ddbbFacade/clientRepositories";
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";

export class LoginController {

    repositories: IClientRepositories;

    constructor() {
        this.repositories = new ClientSqlRepositories();
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            let {email, password} = req.body
            let user: UserApp = await this.repositories.getUser(email)
            let passwordTest = await bcrypt.compare(password, user.password)

            if(!passwordTest) {
                return res.json({error: 'La contraseña no es correcta, por favor intente de nuevo'})
            } else {
                console.log('else')
                let payload = { 
                    user: user.email,
                    role: user.role
                }
                let token = jwt.sign(payload, 'karting_app');
                console.log(token)
                res.json({
                    message: 'Inicio de sesion correcto',
                    token
                })
            }   
            
        } catch (error) {
            console.error('Login Controller Error', error)
            next();
        }
    }
}