import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});