import React from 'react'
import UserForm from '../components/UserForm'

const AddUser = () => {
  return (
    <div className='flex flex-wrap justify-center items-center'>
      <h2 className='text-3xl mb-20 mt-10 underline text-[#262c40]'>Agregar usuario</h2>
      <UserForm />
    </div>
  )
}

export default AddUser