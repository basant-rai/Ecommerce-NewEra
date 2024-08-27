import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

// 
import { SideBar } from '../side-bar'
import { useAuth } from '../../hooks/useAuth'

/**
 * 
 */
const AdminLayout = () => {
  const navigate = useNavigate();
  const { accessToken, role } = useAuth();

  useEffect(() => {
    if (!accessToken || accessToken === undefined) {
      navigate('/login')
    }
    if (accessToken && role === "user") {
      navigate('/user-dashboard')
    }
  }, [accessToken, navigate, role]);

  return (
    <Outlet />
  )
}

export default AdminLayout