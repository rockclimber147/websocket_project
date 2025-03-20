import express, { Request, Response } from "express";
import path from "path";
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const port = 3000;
const server = http.createServer(app)

// io wraps http server which wraps express server
const io = new Server(server)

app.use(express.static(path.join(__dirname, "..", "dist", "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html"));
});

io.on('connection', (socket) => {
  console.log('user connected')
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
