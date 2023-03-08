import express from 'express'
const router = express.Router()
import {
  createOrder,
  getOrders,
  updateOrder,
  getOrderById,
  getMyOrders,
  getAuctionOrders,
  createOrderBid,
  downloadFile,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/auctionorders').get(protect, getAuctionOrders)
router.route('/create').post(protect, createOrder)
router.route('/:id/bids').post(protect, createOrderBid)

router.route('/update/:id').put(protect, updateOrder)
router.route('/:id').get(getOrderById).put(protect, updateOrder)
router.route('/files/download').get(protect, downloadFile)

export default router
