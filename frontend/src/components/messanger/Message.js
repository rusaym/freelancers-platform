import { Avatar, Paper, Typography } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React from 'react'
import TimeAgo from 'javascript-time-ago'

// Russian.
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(ru)

const timeAgo = new TimeAgo('ru-RU')

const Message = ({ message, own = false }) => {
  return (
    <Box
      display='flex'
      alignItems='flex-start'
      sx={{ mt: 2, mr: 2 }}
      justifyContent={own ? 'flex-end' : 'flex-start'}
    >
      <Avatar
        alt={`Avatar n°1`}
        src={`/static/images/avatar/1.jpg`}
        sx={{
          ml: 2,
          mr: 1,
          width: '32px',
          height: '32px',
          display: own && 'none',
        }}
      />
      <Box display='flex' flexDirection='column'>
        <Paper
          sx={{
            maxWidth: 560,
            width: 'auto',
            p: 1,
            borderRadius: '16px',
            bgcolor: own && 'primary.main',
            color: own && 'rgb(255, 255, 255)',
          }}
          elevation={0}
          variant='outlined'
        >
          {message.text}
        </Paper>
        <Typography
          sx={{ color: 'rgb(107, 119, 140)', mx: 2 }}
          variant='body2'
          align={own ? 'right' : 'left'}
        >
          {timeAgo.format(new Date(message.createdAt))}
        </Typography>
      </Box>
      <Avatar
        alt={`Avatar n°1`}
        src={`/static/images/avatar/1.jpg`}
        sx={{
          ml: 1,
          width: '32px',
          height: '32px',
          display: !own && 'none',
        }}
      />
    </Box>
  )
}

export default Message
