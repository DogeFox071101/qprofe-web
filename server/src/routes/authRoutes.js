import express from 'express';
//const express = require("express")
const router = express.Router();
import AuthController from '../controllers/authController.js'
//const authController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;