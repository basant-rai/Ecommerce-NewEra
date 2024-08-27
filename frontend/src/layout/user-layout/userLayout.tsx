import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

import { useAuth } from '../../hooks/useAuth'

/**
 * 
 */
const UserLayout = () => {
  const navigate = useNavigate();
  const { accessToken, role } = useAuth();

  useEffect(() => {
    if (!accessToken || accessToken === undefined) {
      navigate('/login')
    }
    if (accessToken && role === "admin") {
      navigate('/dashboard')
    }
  }, [accessToken, navigate, role]);

  return (
    <Outlet />
  )
}

export default UserLayout