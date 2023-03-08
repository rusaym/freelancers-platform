import express from 'express'
import {
  createConversation,
  getConversation,
} from '../controllers/conversationController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/create').post(
  //protect,
  createConversation
)
router.route('/:userid').get(
  //protect,
  getConversation
)

export default router
