import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { fileURLToPath } from "url";
import path from "path";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "RB262JZ",
  database: "Friend",
  port: 5432,
});

db.connect();

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
app.post("/AddFriend", async (req, res) => {
  const { Name, Email, Phone } = req.body;
  await db.query(
    "INSERT INTO friendlist (FName, FMail, FPhone) VALUES ($1, $2, $3)",
    [Name, Email, Phone]
  );
  res.redirect("/FriendList.html");
});

// API to get friend list
app.get("/api/friends", async (req, res) => {
  const result = await db.query("SELECT * FROM friendlist");
  res.json(result.rows);
});

// Update friend
app.patch("/UpdateFriend/:id", async (req, res) => {
  const { Name, Email, Phone } = req.body;
  const fid = req.params.id;

  await db.query(
    "UPDATE friendlist SET FName = $1, FMail = $2, FPhone = $3 WHERE Fid = $4",
    [Name, Email, Phone, fid]
  );
});

// Delete friend
app.delete("/remove/:id", async (req, res) => {
  const fid = req.params.id;
  await db.query("DELETE FROM friendlist WHERE Fid = $1", [fid]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
