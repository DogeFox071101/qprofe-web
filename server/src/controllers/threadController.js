// threadController.js
import { Novu } from "@novu/node";
//const { Novu } = require("@novu/node");
const novu = new Novu("fe365d89231180940e0b0f2479a5dbcd");

const threadList = [];

class ThreadController {
  static createThread = async (req, res) => {
    const { thread, userId } = req.body;
    let threadId = Math.random().toString(36).substring(2, 10);

    threadList.unshift({
      id: threadId,
      title: thread,
      userId,
      replies: [],
      likes: [],
    });

    await novu.topics.create({
      key: threadId,
      name: thread,
    });

    await novu.topics.addSubscribers(threadId, {
      subscribers: [userId],
    });

    res.json({
      message: "Post creado exitosamente",
      threads: threadList,
    });
  };

  static getAllThreads = (req, res) => {
    res.json({
      threads: threadList,
    });
  };

  static sendLike = (req, res) => {
    const { threadId, userId } = req.body;
    const result = threadList.filter((thread) => thread.id === threadId);
    const threadLikes = result[0].likes;

    const authenticateReaction = threadLikes.filter((user) => user === userId);

    if (authenticateReaction.length === 0) {
      threadLikes.push(userId);
      return res.json({
        message: "Has reaccionado al post",
      });
    }

    res.json({
      error_message: "Solo puedes reaccionar una vez",
    });
  };

  static getReplies = (req, res) => {
    const { id } = req.body;
    const result = threadList.filter((thread) => thread.id === id);
    res.json({
      replies: result[0].replies,
      title: result[0].title,
    });
  };

  static createReply = async (req, res) => {
    const { id, userId, reply } = req.body;
    const result = threadList.filter((thread) => thread.id === id);

    result[0].replies.unshift({ userId, text: reply });

    await novu.trigger("topicnotification", {
      to: [{ type: "Topic", topicKey: id }],
    });

    res.json({
      message: "Respuesta agregada",
    });
  };
}

export default ThreadController;
