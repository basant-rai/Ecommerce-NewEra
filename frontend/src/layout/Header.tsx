import { Link, useLocation } from 'react-router-dom'
import Button from '../component/reusable/button/button';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';

// conditional statement
//  let age =12;
// age >= 12 ? true : false

const NavItems = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "Products",
    path: "/products"
  },
  {
    title: "Pricing",
    path: "/pricing"
  },
  {
    title: "Contact",
    path: "/contact"
  },
]


const Header = () => {

  const count = useAppSelector((state) => state.count.count)

  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location]);

  return (

    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Ecommerce</span>
        </Link>
        <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {
              NavItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`${item.path === location.pathname ? " text-blue-700" : "text-black"} block py-2 px-3 rounded md:bg-transparent md:p-0 `} aria-current="page">
                    {item.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='flex gap-2 items-center'>
          <Link to="/login">
            <Button
              buttonType={"button"}
              buttonColor={isLogin ? { primary: true } : { outline: true }}
              rounded
            >
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button
              buttonType={"button"}
              buttonColor={!isLogin ? { primary: true } : { outline: true }}
              rounded
            >
              Register
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              buttonType={"button"}
              buttonColor={{ secondary: true }}
              rounded
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>

  )
}

export default Header