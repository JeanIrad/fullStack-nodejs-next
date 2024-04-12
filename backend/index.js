const express = require("express");
const os = require("os");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// test api
app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "working api World" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// create user
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// update user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// catch invalid routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "invalid route" });
});
// catch server errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
console.log(os.hostname());
// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`"Server running on port ${PORT}"`);
});
