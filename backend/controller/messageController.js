const Message = require("../model/messageSchema");

const createMessageController = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getMessageByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  createMessageController,
  getMessageByConversationId,
};
