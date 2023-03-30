import { Provider } from 'react-redux'
import RootNavigation from './app/navigation/RootNavigation'
import { store } from './app/redux/store'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Loader from './app/components/Loader'
import { useAppDispatch, useAppSelector } from './app/redux/hooks'
import { selectGeneral } from './app/redux/slices/general.slice'
import { useEffect, useState } from 'react'
import { resetState, selectAuthenticatedUser, setAuthenticatedUser } from './app/redux/slices/auth.slice'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './app/components/Footer'


function App() {
  const general = useAppSelector(selectGeneral)
  const { name, access_token } = useAppSelector(selectAuthenticatedUser)
  const dispatch = useAppDispatch()
  const [finsihedInitialize, setFinsihedInitialize] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userFromStorage = JSON.parse(user)
      console.log('userFromStorage', userFromStorage)
      dispatch(setAuthenticatedUser(userFromStorage))
    }
    setFinsihedInitialize(true)
  }, [dispatch])
  
  const logout = () => {
    dispatch(resetState())
  }

  return (
    <div className="App">
      {finsihedInitialize ? (
        <Provider store={store}>
          <NotificationContainer />
          <Loader show={general.showLoader} />
          <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
              <Navbar.Brand href="/home"><img src="/logocute192.png" alt="Logo" width="35" height="35" /> LazyWorker</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  {access_token ? <Nav.Link href="/my">For me</Nav.Link> : <Outlet />}
                  <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                  <Nav.Link href="/problem"><i className="fa fa-bell" style={{
                    color:'white', 
                    fontSize:'20px',
                    marginRight:'10px',
                    textDecoration: 'none'}}></i>
                  </Nav.Link>
                  {access_token ? (
                    <NavDropdown title={name} id="basic-nav-dropdown">
                      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item onClick={logout} href="/login">Logout</NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown title={'NotLogged'} id="basic-nav-dropdown">
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                      <NavDropdown.Item href="/">Register</NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <RootNavigation />
        </Provider>
      ) : (
        <></>
      )}
      <Footer/>
    </div>
  )
}

export default App
