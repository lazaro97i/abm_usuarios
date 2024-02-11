import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../layouts/Layout"
import AddUser from "../pages/AddUser"
import UpdateUser from "../pages/UpdateUser"


const router = createBrowserRouter([

  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add_user",
        element: <AddUser />
      },
      {
        path: "/update_user/:dni",
        element: <UpdateUser />
      },
      {
        path: "/update_user/",
        element: <UpdateUser />
      }
    ]
  }

])

export default router