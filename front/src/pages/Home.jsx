import React, { useEffect, useState } from 'react'
import UserTable from '../components/UserTable'
import userServices from '../services/userServices'
import toast from 'react-hot-toast'

const { getUsers } = userServices


const Home = () => {

  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!users) {
      handleGetUsers()
    }
  }, [])

  const handleGetUsers = async () => {

    try {
      const res = await toast.promise(getUsers(),
        {
          loading: "Cargando usuarios...",
          success: (!users ? (e) => e.message : null),
          error: "Error al cargar usuarios"
        }
      )
      setUsers(res)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center'>
      <UserTable
        data={users}
        load={loading}
      />
    </div>
  )
}

export default Home