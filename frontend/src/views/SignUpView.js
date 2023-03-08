import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Copyright from '../components/general/Copyright'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Message from '../components/general/Message'
import { Loader } from '../components/general/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { register } from '../actions/userActions'
import { Link as RouterLink } from 'react-router-dom'

const SignUpView = () => {
  const location = useLocation()

  const [userType, setUserType] = useState('customer')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [agreementChecked, setAgreementCheck] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают!')
    } else {
      dispatch(
        register(
          firstName,
          lastName,
          email,
          password,
          userType === 'author' ? true : false
        )
      )
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Регистрация
        </Typography>
        <Box component='form' onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Имя'
                autoFocus
                size='small'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Фамилия'
                name='lastName'
                autoComplete='lname'
                size='small'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                size='small'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Пароль'
                type='password'
                id='password'
                autoComplete='current-password'
                size='small'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Подтверждение пароля'
                type='password'
                id='password'
                autoComplete='current-password'
                size='small'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  disabled={loading}
                >
                  <FormControlLabel
                    value='customer'
                    control={<Radio />}
                    label='Я заказчик'
                  />
                  <FormControlLabel
                    value='author'
                    control={<Radio />}
                    label='Я автор'
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label={
                  <>
                    {'Я принимаю условия '}
                    <Link component={RouterLink} to='/' variant='body1'>
                      пользовательского соглашения.
                    </Link>
                  </>
                }
                disabled={loading}
                checked={agreementChecked}
                onChange={(e) => setAgreementCheck(e.target.checked)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || !agreementChecked}
          >
            Зарегистрироваться
          </Button>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='#' variant='body2'>
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
          {error && <Message severity='error'>{error}</Message>}
          {message && <Message severity='error'>{message}</Message>}
          {loading && <Loader />}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

export default SignUpView
