import { Grid } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Chat from '../components/messanger/Chat'
import Conversations from '../components/messanger/Conversations'
//import { io } from 'socket.io-client'
//import { useSelector } from 'react-redux'
import { OutletContext } from '../context/outlet-context'

const MessangerView = () => {
  const { socket, onlineUsers } = useContext(OutletContext)

  const [messages, setMessages] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  //const [onlineUsers, setOnlineUsers] = useState([])
  //const socket = useRef()

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  useEffect(() => {
    //socket.current = io('ws://localhost:8900')
    socket.current?.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
    // return () => {
    //   socket.current.disconnect()
    // }
  }, [])

  // useEffect(() => {
  //   socket.current?.emit('addUser', userInfo._id)
  //   socket.current?.on('getUsers', (users) => {
  //     setOnlineUsers(users)
  //   })
  // }, [userInfo])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Conversations
            setCurrentChat={setCurrentChat}
            onlineUsers={onlineUsers}
            messages={messages}
          />
        </Grid>
        <Grid item xs={9}>
          <Chat
            currentChat={currentChat}
            socket={socket}
            arrivalMessage={arrivalMessage}
            messages={messages}
            setMessages={setMessages}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default MessangerView
