const Conversation = require("../model/conversationSchema");

const createConversationController = async(req,res) =>{
    console.log(req.body)
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try{
        const saveConversation = await newConversation.save()
        res.status(200).json(saveConversation)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


const getConversationByUserId  =async (req,res) =>{
    try{
        const getConversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(getConversation)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports = {
    createConversationController,
    getConversationByUserId
}