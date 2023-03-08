import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import fs from 'fs-extra'
import path from 'path'

// @desc    Скачать файл с сервера
// @route   GET /api/orders/files/download
// @access  Public
const downloadFile = asyncHandler(async (req, res) => {
  const filepath = req.query.filepath
  res.download(path.join('uploads', filepath))
})

// @desc    Fetch single order
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    published,
    workType,
    workDescription,
    dueToDate,
    budget,
    theme,
    uploadedFiles,
  } = req.body

  const order = new Order({
    published,
    theme,
    workType,
    workDescription,
    dueToDate,
    budget,
    customer: req.user._id,
    files: uploadedFiles,
  })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

const checkFileExist = (filesArr, file) => {
  for (const f of filesArr) {
    if (f.name === file) return true
  }
  return false
}

// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const {
    theme,
    workType,
    workDescription,
    dueToDate,
    budget,
    published,
    uploadedFiles,
  } = req.body

  const order = await Order.findById(req.params.id)

  if (order) {
    order.theme = theme
    order.workDescription = workDescription
    order.workType = workType
    order.dueToDate = dueToDate
    order.budget = budget
    order.published = published
    order.files = uploadedFiles

    fs.readdirSync(`uploads/${req.params.id}`).forEach((file) => {
      if (!checkFileExist(uploadedFiles, file)) {
        fs.unlinkSync(`uploads/${req.params.id}/${file}`)
      }
    })

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ published: true })
  res.json(orders)
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const regex = new RegExp(req.query.keyword, 'i')
  const keyword = req.query.keyword
    ? {
        $and: [{ $or: [{ theme: regex }, { workDescription: regex }] }],
      }
    : {}

  const count = await Order.countDocuments({
    customer: req.user._id,
    ...keyword,
  })
  const orders = await Order.find({ customer: req.user._id, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ orders, pages: Math.ceil(count / pageSize) })
})

// @desc    Get auction orders
// @route   GET /api/orders/auctionorders
// @access  Private
const getAuctionOrders = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const regex = new RegExp(req.query.keyword, 'i')
  const keyword = req.query.keyword
    ? {
        $and: [{ $or: [{ theme: regex }, { workDescription: regex }] }],
      }
    : {}

  const count = await Order.countDocuments({
    published: true,
    customer: { $ne: req.user._id },
    ...keyword,
  })
  const orders = await Order.find({
    published: true,
    customer: { $ne: req.user._id },
    ...keyword,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ orders, pages: Math.ceil(count / pageSize) })
})

// @desc    Create new bid
// @route   POST /api/orders/:id/bids
// @access  Private
const createOrderBid = asyncHandler(async (req, res) => {
  const { bidValue, comment } = req.body

  const order = await Order.findById(req.params.id)

  if (order) {
    const alreadyPlaced = order.bids.find(
      (bid) => bid.user.toString() === req.user._id.toString()
    )

    if (alreadyPlaced) {
      res.status(400)
      throw new Error('Bid already placed')
    }

    const bid = {
      price: bidValue,
      user: req.user._id,
    }

    order.bids.push(bid)

    await order.save()
    res.status(201).json({ message: 'Bid placed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  createOrder,
  updateOrder,
  getOrders,
  getOrderById,
  getMyOrders,
  getAuctionOrders,
  createOrderBid,
  downloadFile,
}
