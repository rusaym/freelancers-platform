import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core'
import { Box } from '@material-ui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../actions/userActions'
import { Loader } from '../components/general/Loader'

const createYearItems = () => {
  let items = [<option key={0}></option>]
  for (let year = new Date().getFullYear(); year >= 1900; year--) {
    items.push(<option key={year}>{year}</option>)
  }
  return items
}

const AccountView = () => {
  const dispatch = useDispatch()

  const [uploading, setUploading] = useState(false)
  const [avatar, setAvatar] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleFileUpload = async (e) => {
    const formData = new FormData()
    const file = e.target.files[0]

    formData.append('image', file)

    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `/api/upload/avatars/${userInfo._id}`,
        formData,
        config
      )
      setAvatar(data)

      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    dispatch(
      updateUserProfile({
        _id: userInfo._id,
        avatar,
        firstName,
        lastName,
        email,
      })
    )
  }

  useEffect(() => {
    setFirstName(userInfo.firstName)
    setLastName(userInfo.lastName)
    setEmail(userInfo.email)
    setAvatar(userInfo.avatar)
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmitForm}>
              <Paper variant='outlined' elevation={0}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ mt: 2, ml: 2 }}>
                      <Typography variant='h5'>Основная информация</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Avatar
                        src=''
                        sx={{
                          width: 128,
                          height: 128,
                        }}
                      />
                      <Button sx={{ ml: 2 }} component='label'>
                        Изменить фото
                        <input
                          type='file'
                          hidden
                          onChange={handleFileUpload}
                          accept='image/*'
                        />
                      </Button>
                    </Box>
                    {uploading && <Loader />}

                    <Box sx={{ mt: 2 }}>
                      <TextField
                        required
                        sx={{ width: 500 }}
                        label='Имя'
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        required
                        sx={{ width: 500 }}
                        label='Фамилия'
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ my: 2 }}>
                      <TextField
                        disabled
                        sx={{ width: 500 }}
                        label='Email'
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={email}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              <Paper variant='outlined' elevation={0} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ mt: 2, ml: 2 }}>
                      <Typography variant='h5'>Образование</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        sx={{ width: 500 }}
                        label='Образовательное учреждение'
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        //value={theme}
                      />
                    </Box>
                    <Box sx={{ my: 2 }}>
                      <TextField
                        sx={{ width: 500 }}
                        label='Степень'
                        size='small'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <TextField
                        label='Год начала'
                        size='small'
                        select
                        InputLabelProps={{
                          shrink: true,
                        }}
                        SelectProps={{
                          native: true,
                        }}
                        sx={{ mr: 2, width: 150 }}
                      >
                        {createYearItems()}
                      </TextField>
                      <TextField
                        label='Год окончания'
                        size='small'
                        select
                        InputLabelProps={{
                          shrink: true,
                        }}
                        SelectProps={{
                          native: true,
                        }}
                        sx={{ width: 150 }}
                      >
                        {createYearItems()}
                      </TextField>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type='submit'
                  color='primary'
                  variant='outlined'
                  startIcon={
                    <img src='/icons/save.png' height='25px' width='25px' />
                  }
                >
                  Сохранить
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default AccountView
