import express, { Request, Response } from "express";
import path from "path";
import http from 'http'
import { Server } from 'socket.io'
import { ioMessageTypes, gameIoMessageTypes } from "../public/shared/Enums";
import { Player } from "../public/shared/Entities"

const app = express();
const port = 3000;
const server = http.createServer(app)


const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

app.use(express.static(path.join(__dirname, "..", "..", "dist", "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "public", 'frontend', "index.html"));
}); 

const players: Map<string, Player> = new Map();

io.on(ioMessageTypes.CONNECTION, (socket) => {
  console.log('user connected with id ' + socket.id)
  players.set(socket.id, new Player(
    500 * Math.random(),
    500 * Math.random(),
    20,
    `hsl(${360 * Math.random()}, 100%, 50%)`,
    socket.id
  ))

  io.emit(gameIoMessageTypes.UPDATE_PLAYERS, Array.from(players.values()))

  socket.on(ioMessageTypes.DISCONNECT, (reason) => {
    console.log(reason)
    players.delete(socket.id)
    io.emit(gameIoMessageTypes.UPDATE_PLAYERS, Array.from(players.values()))
  })
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
