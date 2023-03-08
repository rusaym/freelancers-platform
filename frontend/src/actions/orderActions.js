import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_CREATE_BID_REQUEST,
  ORDER_CREATE_BID_SUCCESS,
  ORDER_CREATE_BID_FAIL,
  // ORDER_LIST_MY_REQUEST,
  // ORDER_LIST_MY_SUCCESS,
  // ORDER_LIST_MY_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/orders/create', order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders =
  (keyword = '', pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/orders/myorders?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      // if (message === 'Not authorized, token failed') {
      //   dispatch(logout())
      // }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      })
    }
  }

export const listAuctionOrders =
  (keyword = '', pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/orders/auctionorders?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      // if (message === 'Not authorized, token failed') {
      //   dispatch(logout())
      // }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      })
    }
  }

export const listOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/orders/${id}`)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/update/${order._id}`,
      order,
      config
    )

    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createOrderBid = (orderId, bid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_BID_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/orders/${orderId}/bids`, bid, config)

    dispatch({
      type: ORDER_CREATE_BID_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: ORDER_CREATE_BID_FAIL,
      payload: message,
    })
  }
}
