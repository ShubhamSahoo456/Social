const express = require('express');
const {createConversationController, getConversationByUserId} = require("../controller/conversationController")

const router = express.Router()

router.post("/createConversation",createConversationController)

router.get("/getConversation/:userId",getConversationByUserId)

module.exports = router