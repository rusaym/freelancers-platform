import React from 'react'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'

export function Loader() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  )
}
