import React, { useState, useEffect, useContext } from 'react'
import Pagination from '@mui/material/Pagination'
import { useNavigate } from 'react-router'
import { MainContext } from '../../context/main-context'

const Paginate = ({ pages, keyword = '' }) => {
  const { selectedMenu } = useContext(MainContext)

  const navigate = useNavigate()

  const [page, setPage] = useState(1)

  const handleChange = (event, value) => {
    setPage(value)
    const menu = selectedMenu.title === 'Мои заказы' ? 'orders' : 'auction'
    navigate(
      keyword
        ? `/app/${menu}/search/${keyword}/page/${value}`
        : `/app/${menu}/page/${value}`
    )
  }
  return (
    pages > 1 && (
      <>
        <Pagination
          color='primary'
          count={pages}
          size='small'
          page={page}
          onChange={handleChange}
        />
      </>
    )
  )
}

export default Paginate
