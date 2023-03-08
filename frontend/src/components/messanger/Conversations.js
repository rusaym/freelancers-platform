import { InputAdornment, List, Paper, TextField } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Conversation from './Conversation'

const Conversations = ({ setCurrentChat, onlineUsers, messages }) => {
  const [conversations, setConversations] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedConv, setSelectedConv] = useState(null)
  const [keyword, setKeyword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleListItemClick = (index) => {
    setSelectedIndex(index)
    setSelectedConv(conversations[index]._id)
  }

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(
          `/api/conversations/${userInfo._id}`,
          config
        )

        setConversations(data)
        if (conversations.length === 0) {
          setCurrentChat(data[0])
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchConversations()
  }, [userInfo, messages])

  useEffect(() => {
    const index = conversations.map((conv) => conv._id).indexOf(selectedConv)
    setSelectedIndex(index !== -1 ? index : 0)
  }, [conversations])

  return (
    <Paper
      elevation={0}
      square
      sx={{
        height: 'calc(100vh - 64px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <img src='/icons/search.png' height='25px' width='25px' />
              </InputAdornment>
            ),
          }}
          placeholder='Пользователи'
          variant='outlined'
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
        />
        <List sx={{ width: '100%' }} component='nav'>
          {conversations
            .filter((conversation) =>
              conversation.oponentName
                .toLowerCase()
                .includes(keyword.toLowerCase())
            )
            .map((conversation, idx) => (
              <div key={idx} onClick={() => setCurrentChat(conversation)}>
                <Conversation
                  onlineUsers={onlineUsers}
                  conversation={conversation}
                  idx={idx}
                  handleListItemClick={handleListItemClick}
                  selectedIndex={selectedIndex}
                  currentUser={userInfo._id}
                  conversations={conversations}
                />
              </div>
            ))}
        </List>
      </Box>
    </Paper>
  )
}

export default Conversations
