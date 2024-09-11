const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [];
const JWT_SECRET = "USER_APP";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Sign Up Endpoint
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username)) {
    return res.status(400).send({ message: "User already exists" });
  }
  users.push({ username, password });
  res.send({ message: "You have signed up" });
});

// Sign In Endpoint
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(403).send({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ username: user.username }, JWT_SECRET);
  res.send({ token });
});

// Get User Info Endpoint
app.get("/me", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const userDetails = jwt.verify(token, JWT_SECRET);
    const user = users.find((user) => user.username === userDetails.username);
    if (user) {
      res.send({ username: user.username });
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).send({ message: "Invalid or expired token" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
