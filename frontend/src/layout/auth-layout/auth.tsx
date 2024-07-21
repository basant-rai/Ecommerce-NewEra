import { Outlet } from 'react-router-dom'
import SideBar from '../side-bar'

const AuthLayout = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default AuthLayout