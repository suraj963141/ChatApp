import Conversation from "../models/coversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SoketIO/server.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged-in user

    // create a conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and save a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Push the new message's ObjectId to the conversation's message array
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Receive message
export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("message");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.message;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in get Message", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
