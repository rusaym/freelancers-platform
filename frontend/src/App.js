import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import routes from '../src/routes'
import theme from './theme'
import GlobalStyles from './components/GlobalStyles'

const App = () => {
  const routing = useRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  )
}

export default App
