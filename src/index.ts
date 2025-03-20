import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

// Serve static files from the dist/public folder
app.use(express.static(path.join(__dirname, "..", "dist", "public"))); // Use ".." to go one level up from src

// Serve the index.html file from dist/public at the root route
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html")); // Use ".." to go one level up from src
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
