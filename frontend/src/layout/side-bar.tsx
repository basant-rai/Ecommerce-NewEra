import {
  Home,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../component/reusable/button/button"
import Cookies from "js-cookie"

interface Props {
  role?: string
}


export function SideBar({ role }: Props) {
  const navigate = useNavigate()
  const logOut = () => {
    Cookies.remove("userId")
    Cookies.remove("role")
    Cookies.remove("accessToken")
    navigate('/login')
  }
  return (
    <div className="fixed w-[240px] bg-white h-screen">

      <div className="hidden border-r md:block h-full">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">E-Commerce</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {
                role === "admin" &&
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/category"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Package className="h-4 w-4" />
                    Category
                  </Link>
                  <Link
                    to="/dashboard/products"
                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  >
                    <Package className="h-4 w-4" />
                    Products{" "}
                  </Link>
                  <Link
                    to="/dashboard/customers"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Users className="h-4 w-4" />
                    Customers
                  </Link>
                  <Link
                    to="/dashboard/orders"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Orders
                  </Link>
                </>
              }
              {
                role === "user" &&
                <>
                  <Link
                    to="/user-dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Home className="h-4 w-4" />
                    User Dashboard
                  </Link>
                  <Link
                    to="/carts"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Home className="h-4 w-4" />
                    Carts
                  </Link>
                  <Link
                    to="/shipping"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Home className="h-4 w-4" />
                    Shipping
                  </Link>
                </>
              }
            </nav>
          </div>
          <div className="mb-10 p-4 w-full">

            <Button
              buttonType={"button"}
              className="w-full"
              onClick={logOut}
              buttonColor={{
                secondary: true,
              }}>
              Logout
            </Button>
          </div>
        </div>

      </div>

    </div>
  )
}
