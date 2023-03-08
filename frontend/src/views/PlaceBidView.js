import { Typography } from '@material-ui/core'
import React, { useState } from 'react'

const PlaceBidView = () => {
  const [budget, setBudget] = useState()
  const [comment, setComment] = useState()

  return (
    <>
      <Box sx={{ m: 2 }}>
        <FormControl sx={{ width: '90%', maxWidth: 250 }}>
          <InputLabel htmlFor='outlined-adornment-amount'>Ставка</InputLabel>
          <OutlinedInput
            size='small'
            type='number'
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            startAdornment={<InputAdornment position='start'>₽</InputAdornment>}
            label='Ставка'
          />
        </FormControl>
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          label='Комментарий для заказчика'
          multiline
          fullWidth={true}
          minRows={5}
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>

      <Button
        onClick={placeBid}
        type='submit'
        color='primary'
        variant='outlined'
        startIcon={<img src='/icons/bet.png' height='25px' width='25px' />}
        sx={{ mb: 1 }}
      >
        Сделать ставку
      </Button>
    </>
  )
}

//export default PlaceBidView
