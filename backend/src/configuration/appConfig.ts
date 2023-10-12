require("dotenv").config();

export interface IClassConfig {
    getAppConfig(): AppConfig;
  }

export interface AppConfig {
  server: IServerConfig;
  webSocket: IWssConfig;
  postgres: IPostgresConfig
}


export interface IServerConfig {
  appport: number;
  apphost: string;
  node_env: string;
}

export interface IWssConfig {
  wssport: number,
  wsshost: string
}

export interface IPostgresConfig {
  user: string,
  password: string,
  database: string,
  postgreshost: string
}

export class AppConfiguration implements IClassConfig {
  constructor() {}

  public getAppConfig(): AppConfig {
    return {
      server: this.getServerEnv(),
      webSocket: this.getWebSocketEnv(),
      postgres: this.getPostgresEnv()
    };
  }

  private getServerEnv(): IServerConfig {
    let serverConfig: IServerConfig = {
      apphost: <string>process.env.HOST,
      appport: parseInt(<string>process.env.APPPORT),
      node_env: <string>process.env.NODE_ENV,
    };
    return serverConfig;
  }

    private getWebSocketEnv(): IWssConfig {
      let wssConfig: IWssConfig = {
        wsshost: <string>process.env.HOST,
        wssport: parseInt(<string>process.env.WSSPORT)
      }

      return wssConfig;
    }

    private getPostgresEnv(): IPostgresConfig {
      let postgresConfig: IPostgresConfig = {
        database: <string>process.env.DATABASE,
        postgreshost: <string>process.env.HOST,
        password: <string>process.env.PASSWORD,
        user: <string>process.env.USERDB
      }
      return postgresConfig;
    }
}
