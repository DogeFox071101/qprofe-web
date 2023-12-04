// Contenido del threadRoutes.js
// (Adapta según las necesidades de tu aplicación)
import express from 'express';
//const express = require("express");
const router = express.Router();
import ThreadController from '../controllers/threadController.js';
//const threadController = require("../controllers/threadController");

router.post("/create", ThreadController.createThread);
router.get("/all", ThreadController.getAllThreads);
router.post("/like", ThreadController.sendLike);
router.post("/replies", ThreadController.getReplies);
router.post("/create/reply", ThreadController.createReply);

export default router;