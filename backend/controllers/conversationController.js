import asyncHandler from 'express-async-handler'
import Conversation from '../models/conversationModel.js'
import User from '../models/userModel.js'

// @desc    Create new conversation
// @route   POST /api/conversations/create
// @access  Private
const createConversation = asyncHandler(async (req, res) => {
  const existedConversation = await Conversation.find({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  })

  if (existedConversation.length === 0) {
    const conversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    })
    const createdConversation = await conversation.save()
    res.status(201).json(createdConversation)
  } else {
    res.status(200).json(existedConversation[0])
  }
})

// @desc    Get user conversation
// @route   Get /api/conversations/:userid
// @access  Private
const getConversation = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    members: { $in: [req.params.userid] },
  })

  let cnvs = []

  try {
    for (const conversation of conversations) {
      const oponentId = conversation.members.find(
        (m) => m !== req.params.userid
      )
      const user = await User.findById(oponentId).select('-password')
      cnvs.push({
        _id: conversation._id,
        members: conversation.members,
        updatedAt: conversation.updatedAt,
        oponentName: `${user.firstName} ${user.lastName}`,
      })
    }
  } catch (error) {
    console.log(error)
  }

  res
    .status(200)
    .json(cnvs.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)))
})

export { createConversation, getConversation }
