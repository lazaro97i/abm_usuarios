import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../layouts/Layout"
import AddUser from "../pages/AddUser"


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
      }
    ]
  }

])

export default router