import { useEffect, useRef, useState } from 'react'
import { useOutlet } from 'react-router-dom'
import { experimentalStyled } from '@material-ui/core'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import { io } from 'socket.io-client'
import { OutletContext } from '../../context/outlet-context'
import { MainContext } from '../../context/main-context'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}))

const DashboardLayoutWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256,
  },
}))

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
})

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
})

const DashboardLayout = () => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(null)

  const [init, setInit] = useState(false)
  const socket = useRef()
  const outlet = useOutlet()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) navigate('/signin')
  }, [])

  useEffect(() => {
    if (userInfo) {
      socket.current = io()

      return () => {
        socket.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (userInfo) {
      socket.current?.emit('addUser', userInfo._id)
      socket.current?.on('getUsers', (users) => {
        setOnlineUsers(users)
      })
      setInit(true)
    }
  }, [userInfo])

  return (
    <>
      {init && (
        <MainContext.Provider value={{ selectedMenu, setSelectedMenu }}>
          <DashboardLayoutRoot>
            <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <DashboardSidebar
              onMobileClose={() => setMobileNavOpen(false)}
              openMobile={isMobileNavOpen}
            />
            <DashboardLayoutWrapper>
              <DashboardLayoutContainer>
                <DashboardLayoutContent>
                  {/* <Outlet /> */}
                  <OutletContext.Provider value={{ socket, onlineUsers }}>
                    {outlet}
                  </OutletContext.Provider>
                </DashboardLayoutContent>
              </DashboardLayoutContainer>
            </DashboardLayoutWrapper>
          </DashboardLayoutRoot>
        </MainContext.Provider>
      )}
    </>
  )
}

export default DashboardLayout
