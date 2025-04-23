import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // serve HTML from /public

// Serve AddFriend Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "AddFriend.html"));
});

app.get("/addFriend", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "AddFriend.html"));
});

// Add a new friend

// API to get friend list

// Update friend

// Delete friend

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
