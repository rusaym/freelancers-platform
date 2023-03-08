import React from 'react'
import Alert from '@material-ui/core/Alert'
import Stack from '@material-ui/core/Stack'

export default function Message({ severity, children }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severity}>{children}</Alert>
    </Stack>
  )
}
