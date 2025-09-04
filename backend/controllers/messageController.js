import { Conversation } from "../models/conversationModel.js"
import { Message } from "../models/messageModel.js"
import { getRecieverSocketId, io } from "../socket/socket.js"

export const sendMessage=async(req,res)=>{
    try{
        const senderId=req.id //taking from middleware
        const receiverId =req.params.id//takes from the url
        const {message}=req.body

        let gotConversation=await Conversation.findOne({
            participants:{$all :[senderId,receiverId]}
            //all the convos between them
        })

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage=await Message.create({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }
        // await gotConversation.save()
        await Promise.all([newMessage.save(),gotConversation.save()])
        
        const recieverSocketId=getRecieverSocketId(receiverId)
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }

        return res.status(201).json({
            newMessage
        })
        //socket io

    }catch(error){
        console.log(error);
    }
}


export const getMessage =async(req,res)=>{
    try{
        const receiverId=req.params.id
        const senderId=req.id
        const conversation =await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages")
        // console.log(conversation)
        return res.status(200).json(conversation?.messages)
    }catch(error){
        console.log(error);
    }
}
