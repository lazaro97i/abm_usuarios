import React, { useState } from 'react'
import UserModal from './UserModal'

const UserTable = ({ data }) => {

  const [modal, setModal] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <div className='flex flex-col justify-start items-center w-full px-5 max-w-[1200px]'>
      <h2 className='mt-10 text-3xl text-primary-950 underline'>Lista de usuarios</h2>
      <table className='border mt-10 w-full'>
        <thead className='border'>
          <tr className=' bg-primary-700 text-primary-100'>
            <th className='py-3'>Nombre</th>
            <th className='py-3 hidden md:block'>Email</th>
            <th className='py-3'>DNI</th>
            <th className='py-3'>Rol</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.data?.map((d) => {
              return (
                <tr key={d.id} onClick={() => { setUser(d), setModal(true) }} className='border hover:bg-primary-200 cursor-pointer transition-all duration-150'>
                  <td className='px-2 py-2 border-x text-start'>{d.name}</td>
                  <td className='px-2 py-2 border-x text-start hidden md:block'>{d.email}</td>
                  <td className='px-2 py-2 border-x'>{d.dni}</td>
                  <td className='px-2 py-2 border-x'>{d.role.id === 1 ? 'ADMIN' : 'USUARIO'}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        modal
          ? <UserModal
            data={user}
            modal={setModal}
          />
          : null
      }
    </div>
  )
}

export default UserTable