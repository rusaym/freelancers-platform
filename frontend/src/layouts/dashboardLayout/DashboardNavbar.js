import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Logo from '../../components/general/Logo'
import { LogOut as LogOutIcon, Bell as BellIcon } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const dispatch = useDispatch()

  const [notifications] = useState([])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <IconButton
          color='inherit'
          onClick={onMobileNavOpen}
          sx={{ display: { lg: 'none', xs: 'block' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <RouterLink to='/'>
            <Logo />
          </RouterLink>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title='Уведомления'>
          <IconButton color='inherit'>
            <Badge
              badgeContent={notifications.length}
              color='primary'
              variant='dot'
            >
              <img src='/icons/notification.png' height='25px' width='25px' />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title='Выйти'>
          <IconButton color='inherit' onClick={logoutHandler}>
            <img src='/icons/logout.png' height='25px' width='25px' />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default DashboardNavbar
