import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

// 
import { SideBar } from '../side-bar'
import { useAuth } from '../../hooks/useAuth'

/**
 * 
 */
const AuthLayout = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken || accessToken === undefined) {
      navigate('/login')
    }
  }, [accessToken, navigate]);

  return (
    <div className="w-full flex">
      <SideBar />
      <div className='ml-60 w-full overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout