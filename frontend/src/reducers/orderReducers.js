import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_RESET,
  ORDER_DETAILS_RESET,
  ORDER_LIST_RESET,
  ORDER_CREATE_BID_REQUEST,
  ORDER_CREATE_BID_SUCCESS,
  ORDER_CREATE_BID_FAIL,
  ORDER_CREATE_BID_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        pages: action.payload.pages,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const orderUpdateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true }
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_UPDATE_RESET:
      return { order: {} }
    default:
      return state
  }
}

export const orderBidCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_BID_REQUEST:
      return { loading: true }
    case ORDER_CREATE_BID_SUCCESS:
      return { loading: false, success: true }
    case ORDER_CREATE_BID_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_BID_RESET:
      return {}
    default:
      return state
  }
}
