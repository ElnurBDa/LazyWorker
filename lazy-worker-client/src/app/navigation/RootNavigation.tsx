import { BrowserRouter, Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import RegisterPage from '../pages/register/RegisterPage'
import HomePage from '../pages/home/HomePage'
import MyArticlesPage from '../pages/myArticles/MyArticlesPage'
import AboutPage from '../pages/about/AboutPage'
import { useAppSelector } from '../redux/hooks'
import { selectAuthenticatedUser } from '../redux/slices/auth.slice'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// these comments will not be removed by Elnur, definetely 
const PrivateRoute = ({ ...rest }: RouteProps): React.ReactElement | null => {
  const { access_token } = useAppSelector(selectAuthenticatedUser)
  // return access_token ? <Route {...rest} /> : <Route {...rest} element={<Navigate replace to="/" />} />
  return access_token ? <Outlet /> : <Navigate to="/" />
}

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/my" element={<PrivateRoute />}>
          <Route path="/my" element={<MyArticlesPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootNavigation
