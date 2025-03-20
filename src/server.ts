import express, { Request, Response } from "express";
import path from "path";
import http from 'http'

const app = express();
const port = 3000;
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, "..", "dist", "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html"));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
