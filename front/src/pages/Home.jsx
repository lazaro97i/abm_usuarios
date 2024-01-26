import React, { useEffect, useState } from 'react'
import UserTable from '../components/UserTable'
import userServices from '../services/userServices'

const { getUsers } = userServices


const Home = () => {

  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className='flex justify-center'>
      <UserTable
        data={users}
      />
    </div>
  )
}

export default Home