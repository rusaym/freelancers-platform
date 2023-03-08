import AppBar from '@material-ui/core/AppBar'
import { Box, Container } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/general/Logo'
import { Link as RouterLink } from 'react-router-dom'

export default function ButtonAppBar() {
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('signin')
  }

  const handleSignUp = () => {
    navigate('signup')
  }

  return (
    <Box>
      <AppBar elevation={0}>
        <Toolbar>
          <Box>
            <RouterLink to='/'>
              <Logo />
            </RouterLink>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button color='inherit' onClick={handleSignUp}>
            Регистрация
          </Button>
          <Button color='inherit' onClick={handleSignIn}>
            Вход
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Outlet />
      </Container>
    </Box>
  )
}
