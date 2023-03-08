import { Box, Typography } from '@material-ui/core'

const Logo = (props) => (
  <Box
    sx={{
      ml: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    <img
      alt='Logo'
      src='/static/logo.svg'
      {...props}
      style={{ maxHeight: 57 }}
    />
    <Typography
      variant='h6'
      color='whitesmoke'
      sx={{ fontSize: 28, fontFamily: 'Dancing Script, cursive' }}
    >
      Academist
    </Typography>
  </Box>
)

export default Logo
