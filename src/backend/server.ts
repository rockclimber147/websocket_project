import express, { Request, Response } from "express";
import path from "path";
import http from 'http'
import { Server } from 'socket.io'
import { ioMessageTypes, gameIoMessageTypes } from "../shared/Enums";

const app = express();
const port = 3000;
const server = http.createServer(app)


const io = new Server(server)

app.use('/backend', (req, res) => {
  res.status(403).send('Forbidden');
});

app.use(express.static(path.join(__dirname, "..", "..", "dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "public", "index.html"));
}); 




class Player {
  x: number;
  y: number;
  radius: number;
  color: string;
  id: string;

  constructor(id: string) {
    this.x = 100;
    this.y = 100;
    this.radius = 50;
    this.color = 'white'
    this.id = id;
  }
}

const players: Map<string, Player> = new Map();

io.on(ioMessageTypes.CONNECTION, (socket) => {
  console.log('user connected with id ' + socket.id)
  players.set(socket.id, new Player(socket.id))

  io.emit(gameIoMessageTypes.UPDATE_PLAYERS, Array.from(players.values()))
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
