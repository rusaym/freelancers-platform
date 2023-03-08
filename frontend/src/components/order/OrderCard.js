import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Link,
} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import GetAppIcon from '@material-ui/icons/GetApp'
import moment from 'moment'
import { Edit } from 'react-feather'
import { useNavigate } from 'react-router'

const OrderCard = ({ order, mode, ...rest }) => {
  const navigate = useNavigate()

  const handleCardEdit = (orderId) => {
    navigate(`/app/orders/edit/${orderId}`)
  }
  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Link
              href={`/app/orders/view/${order._id}`}
              underline='none'
              align='left'
              color='primary'
              variant='h5'
            >
              {order.theme}
            </Link>
            <Typography
              align='left'
              color='textPrimary'
              variant='body1'
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 5,
              }}
            >
              {order.workDescription}
            </Typography>
          </Box>

          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-end'
            alignSelf='center'
          >
            {order.bids.length > 0 && (
              <Typography
                align='right'
                color='textPrimary'
                variant='subtitle1'
                minWidth={150}
                fontWeight={700}
              >
                {`₽ ${Math.max(
                  ...order.bids.map((bid) => bid.price)
                )} - ${Math.min(...order.bids.map((bid) => bid.price))}`}
              </Typography>
            )}

            {mode !== 'auction' && (
              <>
                <Typography
                  align='left'
                  color='textPrimary'
                  variant='subtitle1'
                >
                  Исполнитель: {!order.freelancer && 'Не назначен'}
                </Typography>
                <Chip
                  label={order.published ? 'Опубликовано' : 'Черновик'}
                  sx={{ minWidth: 150 }}
                  color={order.published ? 'primary' : 'default'}
                  variant='outlined'
                />
              </>
            )}
          </Box>
        </Box>
      </CardContent>

      <Box />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {mode !== 'auction' && !order.published && (
              <Tooltip title='Редактировать'>
                <IconButton
                  sx={{ height: 35, width: 35 }}
                  onClick={() => handleCardEdit(order._id)}
                >
                  <img src='/icons/edit.png' height='25px' width='25px' />
                </IconButton>
              </Tooltip>
            )}

            <img src='/icons/clock.png' height='25px' width='25px' />

            <Typography
              color='textSecondary'
              display='inline'
              sx={{ pl: 1 }}
              variant='body2'
            >
              Срок сдачи до {moment(order.dueToDate).format('DD.MM.YYYY')}
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography
              color='textSecondary'
              display='inline'
              sx={{ pl: 1 }}
              variant='body2'
            >
              {order.bids.length} ставок сделано
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default OrderCard
