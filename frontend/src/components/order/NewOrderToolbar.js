import { Box, Button, Typography, IconButton, Tooltip } from '@material-ui/core'
import { useNavigate } from 'react-router'
const NewOrderToolbar = (props) => {
  const navigate = useNavigate()

  const handleNavBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {/* {props.mode !== 'view' && ( */}
            <>
              <Typography variant='h5' sx={{ ml: 1 }}>
                {props.mode === 'edit'
                  ? 'Редактирование заказа'
                  : props.mode === 'view'
                  ? 'Просмотр заказа'
                  : 'Создание нового заказа'}
              </Typography>

              {/* <Tooltip title='Сохранить'>
                  <IconButton type='submit'>
                    <img src='/icons/save.png' height='25px' width='25px' />
                  </IconButton>
                </Tooltip> */}
            </>
            {/* )} */}
          </Box>

          <Button
            color='primary'
            variant='outlined'
            startIcon={<img src='/icons/back.png' height='25px' width='25px' />}
            onClick={handleNavBack}
          >
            Назад
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default NewOrderToolbar
