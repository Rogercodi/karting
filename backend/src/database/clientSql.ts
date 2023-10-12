import { Pool} from 'pg';
import { IPostgresConfig } from '../configuration/appConfig';

export class SqlPool {
    pool: Pool;

    constructor (config: IPostgresConfig){
        this.pool = new Pool({
            ...config,
            allowExitOnIdle: true,
        })
    }

    public getPool() {
        return this.pool
    }

};