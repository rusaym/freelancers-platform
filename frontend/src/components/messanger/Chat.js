import { Paper } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import NewMessage from './NewMessage'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Chat = ({
  currentChat,
  socket,
  arrivalMessage,
  messages,
  setMessages,
}) => {
  const messagesEndRef = useRef(null)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(
          `/api/messages/${currentChat._id}`,
          config
        )

        setMessages(data)
      } catch (err) {
        console.error(err)
      }
    }
    if (currentChat) fetchMessages()
  }, [currentChat])

  const scrollToBottom = () => {
    messagesEndRef.current
      .scrollIntoView
      // { behavior: 'smooth' }
      ()
  }

  useEffect(scrollToBottom, [messages])

  return (
    <Paper
      elevation={0}
      square
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      variant='outlined'
    >
      <Box sx={{ height: '100vh', overflowY: 'scroll' }}>
        {messages.map((message, idx) => (
          <Message
            key={idx}
            message={message}
            own={message.sender === userInfo._id}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <NewMessage
        socket={socket}
        currentChat={currentChat}
        messages={messages}
        setMessages={setMessages}
        scrollToBottom={scrollToBottom}
      />
    </Paper>
  )
}

export default Chat
