import { useContext, useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Typography,
} from '@material-ui/core'
import NavItem from './NavItem'
import { useSelector } from 'react-redux'
import { MainContext } from '../../context/main-context'

const MessagesIcon = () => {
  return (
    <img
      src='/icons/messages.png'
      height='25px'
      width='25px'
      style={{ marginRight: '10px' }}
    />
  )
}

const AuctionIcon = () => {
  return (
    <img
      src='/icons/auction.png'
      height='25px'
      width='25px'
      style={{ marginRight: '10px' }}
    />
  )
}

const OrdersIcon = () => {
  return (
    <img
      src='/icons/orders.png'
      height='25px'
      width='25px'
      style={{ marginRight: '10px' }}
    />
  )
}

const ProfileIcon = () => {
  return (
    <img
      src='/icons/profile.png'
      height='25px'
      width='25px'
      style={{ marginRight: '10px' }}
    />
  )
}

const SettingsIcon = () => {
  return (
    <img
      src='/icons/settings.png'
      height='25px'
      width='25px'
      style={{ marginRight: '10px' }}
    />
  )
}

const customerItems = [
  {
    href: '/app/orders',
    icon: OrdersIcon,
    title: 'Мои заказы',
  },
  {
    href: '/app/messages',
    icon: MessagesIcon,
    title: 'Мои переписки',
  },
  {
    href: '/app/account',
    icon: ProfileIcon,
    title: 'Профиль',
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Настройки',
  },
]

const authorItems = [
  {
    href: '/app/auction',
    icon: AuctionIcon,
    title: 'Аукцион',
  },
  {
    href: '/app/orders',
    icon: OrdersIcon,
    title: 'Мои заказы',
  },
  {
    href: '/app/messages',
    icon: MessagesIcon,
    title: 'Мои переписки',
  },
  {
    href: '/app/account',
    icon: ProfileIcon,
    title: 'Профиль',
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Настройки',
  },
]

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const items = userInfo?.isWriter ? authorItems : customerItems
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: userInfo?.isWriter ? 'Автор' : 'Заказчик',
    name: userInfo?.firstName + ' ' + userInfo?.lastName,
  }

  const { selectedMenu, setSelectedMenu } = useContext(MainContext)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
  }, [location.pathname])

  // useEffect(() => {
  //   setSelectedMenu(items[0])
  //   navigate(items[0].href)
  // }, [])

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64,
          }}
          to='/app/account'
        />
        <Typography color='textPrimary' variant='h6' align='center'>
          {user.name}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <div
              onClick={() => {
                setSelectedMenu(item)
              }}
            >
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            </div>
          ))}
        </List>
      </Box>
    </Box>
  )

  return (
    <>
      <Drawer
        sx={{ display: { lg: 'none', xs: 'block' } }}
        anchor='left'
        onClose={onMobileClose}
        open={openMobile}
        variant='temporary'
        PaperProps={{
          sx: {
            width: 256,
          },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        sx={{ display: { xs: 'none', lg: 'block' } }}
        anchor='left'
        open
        variant='persistent'
        PaperProps={{
          sx: {
            width: 256,
            top: 64,
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {content}
      </Drawer>
    </>
  )
}

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
}

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
}

export default DashboardSidebar
