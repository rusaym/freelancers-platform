import { createTheme } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white,
    },
    primary: {
      main: '#2574A9',
    },
    secondary: {
      main: '#2E151B',
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
  },
})

export default theme
