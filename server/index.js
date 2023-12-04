import express, { urlencoded, json } from "express";
//import cookieParser from "cookie-parser";
//const bodyParser = require("body-parser");
import cors from 'cors';
//import corsMiddleware from "../src/middlewares/corsMiddleware";
//const corsMiddleware = require("../src/middlewares/corsMiddleware");
//import AuthController from "../src/controllers/authController.js";
//const AuthController = require("../src/controllers/authController");
//import ThreadController from "../src/controllers/threadController.js";
//const ThreadController = require("../src/controllers/threadController");
//import SecurityController from "../src/controllers/securityController.js"
//const SecurityController = require("../src/controllers/securityController");
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
//app.use(corsMiddleware);

//Protección contra CSRF - Q'Profe
//app.use(cookieParser());

// Configuración de csurf - Q'Profe
//app.use(csurf({ cookie: true }));

// Rutas
import authRoutes from './src/routes/authRoutes.js'
//const authRoutes = require("../src/routes/authRoutes");
import threadRoutes from './src/routes/threadRoutes.js'
//const threadRoutes = require("../src/routes/threadRoutes");
import securityRoutes from './src/routes/securityRoutes.js'
//const securityRoutes = require("../src/routes/securityRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/thread", threadRoutes);
app.use("/api/security", securityRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
