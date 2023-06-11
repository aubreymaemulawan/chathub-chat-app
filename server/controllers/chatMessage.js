import ChatMessage from "../models/ChatMessage.js";

export const createMessage = async (req, res) => {
  const { chatRoomId, sender, message } = req.body;
  console.log(req.file);
  var image = null;
  if (req.file) {
    image = req.file.path;
  }

  const newMessage = new ChatMessage({
    chatRoomId,
    sender,
    message,
    image: image,
  });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      chatRoomId: req.params.chatRoomId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
