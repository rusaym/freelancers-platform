import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Pagination } from '@material-ui/core'
import OrderListToolbar from '../components/order/OrderListToolbar'
import { listMyOrders, listAuctionOrders } from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/general/Loader'
import Message from '../components/general/Message'
import OrderCard from '../components/order/OrderCard'
import { useNavigate, useParams } from 'react-router'
import Paginate from '../components/general/Paginate'
import { ORDER_LIST_RESET } from '../constants/orderConstants'

const OrderListView = ({ mode = 'myOrders' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { keyword } = useParams()
  const { pageNumber } = useParams() || 1

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, pages } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useEffect(() => {
  //   console.log(userInfo)
  //   if (!userInfo) navigate('/signin')
  // }, [])

  useEffect(() => {
    if (mode === 'auction') {
      dispatch(listAuctionOrders(keyword, pageNumber))
    } else {
      dispatch(listMyOrders(keyword, pageNumber))
    }
    // return () => {
    //   dispatch({ type: ORDER_LIST_RESET })
    // }
  }, [dispatch, keyword, pageNumber, mode])

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth='lg'>
          <OrderListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message severity='error'>{error}</Message>
              ) : (
                <>
                  {orders.map((order) => (
                    <Grid item key={order.id} xs={12}>
                      <OrderCard order={order} mode={mode} />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
            }}
          >
            <Paginate pages={pages} keyword={keyword} />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default OrderListView
