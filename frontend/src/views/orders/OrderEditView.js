import React, { useState, useEffect } from 'react'
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
} from '@material-ui/core'
import NewOrderToolbar from '../../components/order/NewOrderToolbar'
import UploadFiles from '../../components/order/UploadFiles'
import DatePicker from '@material-ui/lab/DatePicker'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import ruLocale from 'date-fns/locale/ru'
import {
  createOrder,
  updateOrder,
  listOrderDetails,
} from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import workTypes from '../../data/workTypes'
import { useNavigate, useParams } from 'react-router'
import { Loader } from '../../components/general/Loader'
import Message from '../../components/general/Message'
import {
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
  ORDER_UPDATE_RESET,
} from '../../constants/orderConstants'
import axios from 'axios'

const AccessibleIcon = () => {
  return <img src='/icons/calendar.png' height='25px' width='25px' />
}

const OrderEditView = ({ mode }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [orderGuid, setOrderGuid] = useState(null)

  const { id } = useParams()

  const [workType, setWorkType] = useState(workTypes[0])
  const [theme, setTheme] = useState()
  const [workDescription, setWorkDescription] = useState()
  const [dueToDate, setDueToDate] = useState(new Date())
  const [budget, setBudget] = useState()
  const [published, setPublished] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderCreate = useSelector((state) => state.orderCreate)
  const { loading, success, error, order: createdOrder } = orderCreate

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading: loadingDetails, error: errorDetails, order } = orderDetails

  const orderUpdate = useSelector((state) => state.orderUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = orderUpdate

  useEffect(() => {
    const uploadFiles = async () => {
      await handleFileUpload(selectedFiles)
    }

    if (success) {
      setOrderGuid(createdOrder._id)
      if (orderGuid) {
        if (selectedFiles.length > 0) {
          uploadFiles()
        }
        navigate('/')
        dispatch({ type: ORDER_CREATE_RESET })
      }
    }
    return () => dispatch({ type: ORDER_DETAILS_RESET })
  }, [navigate, success, orderGuid])

  useEffect(() => {
    if (mode && mode === 'edit') {
      if (successUpdate) {
        dispatch({ type: ORDER_UPDATE_RESET })
        navigate('/')
      } else {
        setOrderGuid(id)

        if (!order || Object.keys(order).length === 0) {
          dispatch(listOrderDetails(id))
        } else {
          setWorkType(order.workType)
          setTheme(order.theme)
          setWorkDescription(order.workDescription)
          setDueToDate(order.dueToDate)
          setBudget(order.budget)
          setSelectedFiles(order.files)
        }
      }
    }
  }, [successUpdate, order, dispatch])

  const submitOrderHandler = async (e) => {
    e.preventDefault()
    if (mode === 'edit') {
      await handleFileUpload(selectedFiles)
    }

    const data = {
      _id: id,
      theme,
      workType,
      workDescription,
      dueToDate,
      budget,
      published,
      uploadedFiles: selectedFiles.map((e) => {
        return {
          name: e.name,
        }
      }),
    }

    if (mode === 'edit') {
      dispatch(updateOrder(data))
    } else {
      dispatch(createOrder(data))
    }
  }

  const handleFileUpload = async (files) => {
    const formData = new FormData()

    for (const key of Object.keys(files)) {
      formData.append('fileCollection', files[key])
    }

    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `/api/upload/${orderGuid}`,
        formData,
        config
      )

      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

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
          <form onSubmit={submitOrderHandler}>
            <NewOrderToolbar mode={mode} />
            <Grid container spacing={2}>
              <Grid item lg={9} md={7} xs={12}>
                <Box sx={{ pt: 3 }}>
                  <Paper variant='outlined' elevation={0}>
                    <Box sx={{ m: 2 }}>
                      <TextField
                        required
                        label='Тема задания'
                        fullWidth={true}
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ m: 2 }}>
                      <TextField
                        select
                        label='Тип работы'
                        variant='outlined'
                        SelectProps={{
                          native: true,
                        }}
                        size='small'
                        fullWidth={true}
                        value={workType}
                        onChange={(e) => setWorkType(e.target.value)}
                      >
                        {workTypes.map((e) => (
                          <option>{e}</option>
                        ))}
                      </TextField>
                    </Box>
                    <Box sx={{ m: 2 }}>
                      <TextField
                        required
                        label='Описание задания'
                        multiline
                        fullWidth={true}
                        minRows={5}
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={workDescription}
                        onChange={(e) => setWorkDescription(e.target.value)}
                      />
                    </Box>
                  </Paper>
                  <Paper variant='outlined' elevation={0} sx={{ mt: 2 }}>
                    <Box sx={{ m: 2 }}>
                      <UploadFiles
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                      />
                    </Box>
                  </Paper>
                </Box>
              </Grid>
              <Grid item lg={3} md={5} xs={12}>
                <Box sx={{ pt: 3 }}>
                  <Paper variant='outlined' elevation={0}>
                    <Box sx={{ m: 2 }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        locale={ruLocale}
                      >
                        <DatePicker
                          label='Срок сдачи'
                          mask='__.__.____'
                          value={dueToDate}
                          onChange={(newValue) => setDueToDate(newValue)}
                          components={{
                            OpenPickerIcon: AccessibleIcon,
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: '90%', maxWidth: 250 }}
                              size='small'
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
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
                          onChange={(e) => setBudget(e.target.value)}
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
                      // justifyContent: 'center',
                      mt: 2,
                    }}
                  >
                    <Button
                      onClick={() => setPublished(true)}
                      type='submit'
                      color='primary'
                      variant='outlined'
                      startIcon={
                        <img
                          src='/icons/publish.png'
                          height='25px'
                          width='25px'
                        />
                      }
                      sx={{ mb: 1 }}
                    >
                      Опубликовать заказ
                    </Button>

                    <Button
                      //onClick={() => setPublished(false)}
                      type='submit'
                      color='primary'
                      variant='outlined'
                      startIcon={
                        <img src='/icons/save.png' height='25px' width='25px' />
                      }
                    >
                      Сохранить заказ
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
        </Container>
      </Box>
    </>
  )
}

export default OrderEditView
