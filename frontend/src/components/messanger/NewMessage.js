import { Avatar, IconButton, TextField } from '@material-ui/core'
import { Box } from '@material-ui/system'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const NewMessage = ({
  currentChat,
  messages,
  setMessages,
  scrollToBottom,
  socket,
}) => {
  const [messageText, setMessageText] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleSubmit = async () => {
    const message = {
      sender: userInfo._id,
      conversationId: currentChat._id,
      text: messageText,
    }

    const receiverId = currentChat.members.find(
      (member) => member !== userInfo._id
    )

    socket.current.emit('sendMessage', {
      senderId: userInfo._id,
      receiverId,
      text: messageText,
    })

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post('/api/messages/create', message, config)
      setMessages([...messages, data])
      setMessageText('')
      scrollToBottom()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box
      sx={{
        p: 2,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Avatar
        alt={`Avatar n°1`}
        src={`/static/images/avatar/1.jpg`}
        sx={{
          mr: 1,
        }}
      />

      <TextField
        multiline
        fullWidth={true}
        size='small'
        placeholder='Сообщение'
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
          },
        }}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.keyCode === 13 && !e.ctrlKey) {
        //     e.preventDefault()
        //     if (messageText.trim() !== '') handleSubmit()
        //   }
        // }}
      />
      <Tooltip title='Отправить'>
        <IconButton disabled={messageText.trim() === ''} onClick={handleSubmit}>
          <img src='/icons/send.png' height='25px' width='25px' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default NewMessage
