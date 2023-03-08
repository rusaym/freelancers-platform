import express from 'express'
import { createMessage, getMessages } from '../controllers/messageController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/create').post(protect, createMessage)
router.route('/:convid').get(protect, getMessages)

export default router
