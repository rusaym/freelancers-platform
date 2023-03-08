import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'
import Conversation from '../models/conversationModel.js'

// @desc    Create a message
// @route   POST /api/messages/create
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  const message = new Message(req.body)
  const conversation = await Conversation.findById(req.body.conversationId)
  conversation.updatedAt = new Date()
  await conversation.save()

  const createdMessage = await message.save()
  res.status(201).json(createdMessage)
})

// @desc    Fetch messages by conversationId
// @route   GET /api/messages/:convid
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.convid,
  })
  res.status(200).json(messages)
})

export { createMessage, getMessages }
