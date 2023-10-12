import express, {Application} from 'express';
import * as http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import { CorsConfig } from './configuration/corsConfig';
import mainRouter from './routers/mainRouter';
import {  IPostgresConfig, IServerConfig } from './configuration/appConfig';
import { SqlPool } from './database/clientSql';
import { Pool } from 'pg';



export class API {
    app: Application;
    httpServer?: http.Server;
    static poolConnection: Pool;

    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors(CorsConfig));
        this.app.use(morgan('dev'));
        this.app.use(mainRouter);
    }

    public async init (config: IServerConfig, dbConfig: IPostgresConfig) {
        API.poolConnection = new SqlPool(dbConfig).pool;
        return this.listen(config.appport, config.apphost, config.node_env)
    }

    private async listen(port: number, host: string, env: string) {
        return this.httpServer = this.app.listen(port, host, () => {
            console.log(`App is running on http://${host}:${port} in a ${env} NodeJs environment`)
        })
    }
};
