const express = require("express");
const PORT = 8000;
const mongoose = require("mongoose");
require("dotenv").config(); // esto sirve para arrancar la configuracion del .env de mongodb

const app = express();
app.use(express.json());

// Importacion de rutas
const animalesRoute = require("./Routes/animalesRoute");
const diagnosticoRoute = require("./Routes/diagnosticoRoute");
const userRouter = require("./Routes/userRoutes");
const loginRouter = require("./Routes/loginRoute");

// Conexion con mongodb;
const url_mongodb = process.env.DATA_URL_MONGO;
mongoose.connect(url_mongodb);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Error en la conexion de mongo");
});

db.on("connected", () => {
  console.log("Success connect");
});

db.on("disconnected", () => {
  console.log("Mongo is disconnected");
});

app.use("/animales", animalesRoute);
app.use("/diagnostico", diagnosticoRoute);
app.use("/user", userRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
