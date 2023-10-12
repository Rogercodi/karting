import { Socket } from "socket.io";
import * as http from "http";
import cors from "cors";
import express, { Application } from "express";
import socketIo from "socket.io";
import { IWssConfig } from "../configuration/appConfig";

const corsOptions = {
  origin: "http://192.168.4.33:4200", // Reemplaza con la URL de tu aplicación Angular
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

interface ChatUser {
  id: string;
  username: string;
}

interface ChatMessage {
  username: string;
  message: string;
}

export class ChatWebSocketServer {
  app: Application;
  http!: http.Server;
  io!: socketIo.Server;
  users: ChatUser[] = [];

  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  async init(config: IWssConfig): Promise<void> {
    this.http = http.createServer(this.app);
    this.io = new socketIo.Server(this.http, {
      cors: corsOptions,
    });
    await this.listen(config.wssport, config.wsshost);
  }

  private async listen(port: number, host: string) {
    this.http.listen(port, host, () =>
      console.log(`Chat web socket server is running on http://${host}:${port}`)
    );

    return await this.handleEvents();
  }

  private async handleEvents() {
    //Connection Event
    this.io.on("connection", (socket: Socket) => {
      console.log("New user connected");

      //New User
      socket.on("join", (data: ChatUser) => {
        this.users.push(data);
        this.io.emit("userschange", this.users);
        this.io.emit('chat-message', {
            username: 'Server',
            message: `El usuario ${data.username} se ha unido a la sesion`
        })
        
      });

      //New Message
      socket.on("chat-message", (data: ChatMessage) => {
        console.log(data);
        this.io.emit("chat-message", {
          username: data.username,
          message: data.message,
        });
      });

      //Remove User
      socket.on("close", (data: any) => {
        let { username } = data;
        let test = this.users.filter(
          (user: ChatUser) => user.username !== username
        );
        this.users = test;
        this.io.emit("userschange", this.users);
        this.io.emit('chat-message', {
            username: 'Server',
            message: `El usuario ${data.username} se ha desconectado de la sesion`
        })
        
      });

      //User Disconnect
      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    });
  }
}
