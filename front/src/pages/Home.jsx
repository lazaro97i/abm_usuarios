import React, { useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  useEffect(() => {

    getUsers()

  }, [])

  const getUsers = async () => {

    const res = await axios.get("http://localhost:8080/api/user");

    console.log(res)

  }

  return (
    <div className='h-full flex justify-center'>
      holis
    </div>
  )
}

export default Home