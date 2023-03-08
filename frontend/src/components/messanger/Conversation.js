import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const Conversation = ({
  conversation,
  idx,
  handleListItemClick,
  selectedIndex,
  currentUser,
  onlineUsers,
  conversations,
}) => {
  const [online, setOnline] = useState(false)

  useEffect(() => {
    const oponentId = conversation.members.find((m) => m !== currentUser)
    if (onlineUsers.map((onUsr) => onUsr.userId).indexOf(oponentId) !== -1) {
      setOnline(true)
    } else {
      setOnline(false)
    }
  }, [onlineUsers, conversations])

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={
          selectedIndex === idx && {
            borderLeft: '3px solid #2574A9',
          }
        }
        selected={selectedIndex === idx}
        onClick={() => {
          handleListItemClick(idx)
        }}
      >
        <ListItemAvatar
          sx={
            selectedIndex === idx && {
              ml: '-3px',
            }
          }
        >
          <Badge
            color={online ? 'success' : 'default'}
            overlap='circular'
            variant='dot'
          >
            <Avatar
            // alt={`Avatar n°${conversation + 1}`}
            // src={`/static/images/avatar/${conversation + 1}.jpg`}
            />
          </Badge>
        </ListItemAvatar>

        <ListItemText primary={conversation.oponentName} />
      </ListItemButton>
    </ListItem>
  )
}

export default Conversation
