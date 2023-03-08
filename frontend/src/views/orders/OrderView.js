import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  Box,
  Grid,
  Container,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  DialogTitle,
  IconButton,
  Dialog,
  Typography,
} from '@material-ui/core'
import NewOrderToolbar from '../../components/order/NewOrderToolbar'
import UploadFiles from '../../components/order/UploadFiles'
import DatePicker from '@material-ui/lab/DatePicker'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import ruLocale from 'date-fns/locale/ru'
import { createOrderBid, listOrderDetails } from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import workTypes from '../../data/workTypes'
import { useNavigate, useParams } from 'react-router'
import { Loader } from '../../components/general/Loader'
import Message from '../../components/general/Message'
import { styled } from '@mui/material/styles'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import moment from 'moment'
import axios from 'axios'
import { OutletContext } from '../../context/outlet-context'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

const OrderView = ({ mode }) => {
  const { socket } = useContext(OutletContext)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  const [workType, setWorkType] = useState(workTypes[0])
  const [theme, setTheme] = useState()
  const [workDescription, setWorkDescription] = useState()
  const [dueToDate, setDueToDate] = useState(new Date())
  const [budget, setBudget] = useState()
  const [bidValue, setBidValue] = useState()
  const [canBid, setCanBid] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails

  const [open, setOpen] = useState(false)
  const [bidMessage, setBidMessage] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const confirmBid = async (e) => {
    e.preventDefault()

    dispatch(
      createOrderBid(id, {
        bidValue,
        comment: bidMessage,
      })
    )

    let conversationId = null
    // get conversation
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const req = await axios.post(
        '/api/conversations/create',
        { senderId: userInfo._id, receiverId: order.customer },
        config
      )
      conversationId = req.data._id
    } catch (err) {
      console.error(err)
    }

    // send a message
    const message = {
      sender: userInfo._id,
      conversationId,
      text: bidMessage,
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post('/api/messages/create', message, config)

      //Отправить сообщение
      socket.current.emit('sendMessage', {
        senderId: userInfo._id,
        receiverId: order.customer,
        text: bidMessage,
      })
    } catch (err) {
      console.error(err)
    }

    navigate('/')
  }

  useEffect(() => {
    if (!order || Object.keys(order).length === 0) {
      dispatch(listOrderDetails(id))
    } else {
      setWorkType(order.workType)
      setTheme(order.theme)
      setWorkDescription(order.workDescription)
      setDueToDate(order.dueToDate)
      setBudget(order.budget)
      setSelectedFiles(order.files)
      setCanBid(
        order.bids.map((bid) => bid.user).indexOf(userInfo._id) === -1
          ? true
          : false
      )
    }
  }, [order])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth='lg'>
            <NewOrderToolbar mode='view' />
            <Grid container spacing={2}>
              <Grid item lg={9} md={7} xs={12}>
                <Box sx={{ pt: 3 }}>
                  <Paper variant='outlined' elevation={0}>
                    <Box sx={{ m: 2 }}>
                      <TextField
                        label='Тема задания'
                        fullWidth={true}
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={theme}
                      />
                    </Box>
                    <Box sx={{ m: 2 }}>
                      <TextField
                        label='Тип работы'
                        variant='outlined'
                        SelectProps={{
                          native: true,
                        }}
                        size='small'
                        fullWidth={true}
                        value={workType}
                      >
                        {workTypes.map((e) => (
                          <option>{e}</option>
                        ))}
                      </TextField>
                    </Box>
                    <Box sx={{ m: 2 }}>
                      <TextField
                        label='Описание задания'
                        multiline
                        fullWidth={true}
                        minRows={5}
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={workDescription}
                      />
                    </Box>
                  </Paper>
                  {selectedFiles.length > 0 && (
                    <Paper variant='outlined' elevation={0} sx={{ mt: 2 }}>
                      <Box sx={{ m: 2 }}>
                        <UploadFiles
                          selectedFiles={selectedFiles}
                          setSelectedFiles={setSelectedFiles}
                          mode='view'
                        />
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Grid>
              <Grid item lg={3} md={5} xs={12}>
                <Box sx={{ pt: 3 }}>
                  <Paper variant='outlined' elevation={0}>
                    <Box sx={{ m: 2 }}>
                      <TextField
                        label='Срок сдачи'
                        fullWidth={true}
                        sx={{ width: '90%', maxWidth: 250 }}
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={moment(dueToDate).format('DD.MM.yyyy')}
                      />
                    </Box>
                    <Box sx={{ m: 2 }}>
                      <FormControl sx={{ width: '90%', maxWidth: 250 }}>
                        <InputLabel htmlFor='outlined-adornment-amount'>
                          Бюджет
                        </InputLabel>
                        <OutlinedInput
                          size='small'
                          type='number'
                          value={budget}
                          startAdornment={
                            <InputAdornment position='start'>₽</InputAdornment>
                          }
                          label='Бюджет'
                        />
                      </FormControl>
                    </Box>
                  </Paper>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      mt: 2,
                    }}
                  >
                    {order?.customer !== userInfo._id && (
                      <Button
                        disabled={!canBid}
                        onClick={handleClickOpen}
                        color='primary'
                        variant='outlined'
                        startIcon={
                          <img
                            src='/icons/bet.png'
                            height='25px'
                            width='25px'
                          />
                        }
                        sx={{ mb: 1 }}
                      >
                        Сделать ставку
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      <BootstrapDialog onClose={handleClose} open={open} maxWidth='md'>
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          Ваша ставка
        </BootstrapDialogTitle>
        <form onSubmit={confirmBid}>
          <DialogContent dividers>
            <Box sx={{ mb: 2 }}>
              <FormControl sx={{ width: '90%', maxWidth: 250 }} required>
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Ставка
                </InputLabel>
                <OutlinedInput
                  size='small'
                  type='number'
                  value={bidValue}
                  startAdornment={
                    <InputAdornment position='start'>₽</InputAdornment>
                  }
                  label='Ставка'
                  onChange={(e) => setBidValue(e.target.value)}
                />
              </FormControl>
            </Box>

            <TextField
              sx={{ width: 600 }}
              label='Сообщение заказчику'
              fullWidth={true}
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              minRows={3}
              value={bidMessage}
              onChange={(e) => setBidMessage(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button
              type='submit'
              color='primary'
              variant='outlined'
              startIcon={
                <img src='/icons/bet.png' height='25px' width='25px' />
              }
              sx={{ mb: 1 }}
            >
              Подтвердить ставку
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  )
}

export default OrderView
