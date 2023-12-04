import express from 'express';
//const express = require("express");
const router = express.Router();
import SecurityController from '../controllers/securityController.js'
//const securityController = require("../controllers/securityController");

router.post("/generate", SecurityController.generateSecurityHash);

export default router;
