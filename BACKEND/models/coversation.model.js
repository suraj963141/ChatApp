import mongoose, { mongo } from "mongoose";
import User from "../models/user.model.js";
import Message from "./message.model.js";

const coversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Coversation", coversationSchema);

export default Conversation;
