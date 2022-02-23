const express = require('express');
const { createMessageController, getMessageByConversationId } = require('../controller/messageController');


const router = express.Router();

router.post("/createMessage",createMessageController)

router.get("/getMessagesByConversation/:conversationId",getMessageByConversationId)

module.exports = router