import mongoose from 'mongoose'

const bidSchema = mongoose.Schema(
  {
    price: { type: Number, required: true, default: 0 },
    comment: { type: String, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const orderSchema = mongoose.Schema(
  {
    theme: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    workType: {
      type: String,
      required: true,
    },
    workDescription: {
      type: String,
      required: true,
    },
    bids: [bidSchema],

    dueToDate: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      default: 0,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    filesFolder: { type: String },
    files: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
