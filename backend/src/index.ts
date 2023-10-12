import { API } from "./API";
import { AppConfiguration } from "./configuration/appConfig";
import { ChatWebSocketServer } from "./webSocket/webSocketServer";

const getConfig = new AppConfiguration().getAppConfig();
const {apphost, appport, node_env,} = getConfig.server;
const {wsshost, wssport} = getConfig.webSocket;
const {database,password,postgreshost,user} = getConfig.postgres;

console.log(getConfig.postgres)

const checkEnvVar = (apphost: string, appport: number, node_env: string, wsshost: string, wssport: number, database: string, password: string, postgreshost: string, user: string) => {
    return apphost && appport && node_env && wsshost && wssport && database && password && postgreshost && user
}

const app = new API();
const chatwss = new ChatWebSocketServer();

const main = async () => {
    if(!checkEnvVar(apphost, appport, node_env, wsshost, wssport, database, password, postgreshost, user)) {
        throw new Error('Main Error, missing env variables')
    } else {
        await app.init(getConfig.server, getConfig.postgres);
        await chatwss.init(getConfig.webSocket);     
    }
};

main().catch((error) => {
    console.log('Main Error', error)
});

process.on("uncaughtException", err => {
    console.log("uncaughtException", err);
});



