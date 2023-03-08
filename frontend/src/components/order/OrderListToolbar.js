import { useContext, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core'

import { useNavigate } from 'react-router'
import { MainContext } from '../../context/main-context'

const OrderListToolbar = (props) => {
  const { selectedMenu } = useContext(MainContext)

  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleNewOrder = () => {
    navigate('/app/orders/create')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const menu = selectedMenu.title === 'Мои заказы' ? 'orders' : 'auction'

    if (keyword.trim()) {
      navigate(`/app/${menu}/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            color='primary'
            variant='outlined'
            startIcon={<img src='/icons/plus.png' height='25px' width='25px' />}
            onClick={handleNewOrder}
          >
            Новый заказ
          </Button>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ mt: 3 }}>
            <Card variant='outlined'>
              <CardContent>
                <Box
                  sx={{
                    maxWidth: 500,
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                >
                  <TextField
                    fullWidth
                    size='small'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img
                            src='/icons/search.png'
                            height='25px'
                            width='25px'
                          />
                        </InputAdornment>
                      ),
                    }}
                    placeholder='Поиск заказа'
                    variant='outlined'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <Button
                    sx={{ ml: 2, pl: 5, pr: 5 }}
                    variant='outlined'
                    type='submit'
                  >
                    Найти
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default OrderListToolbar
