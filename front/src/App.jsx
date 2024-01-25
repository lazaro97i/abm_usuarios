import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
