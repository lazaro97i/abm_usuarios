import React, { useState } from 'react'
import UserModal from './UserModal'

const UserTable = ({ data, load }) => {

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
        <tbody className='relative z-0'>
          {
            load
              ? <tr className='h-[150px] flex content-center'>
                <td>
                  <svg className='w-full' xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" overflow="visible" fill="#52d4ff" stroke="none"><defs><circle id="loader" r="4" cx="50" cy="50" transform="translate(0 -30)" /></defs><use xlinkHref="#loader" transform="rotate(0 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(45 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.125s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(90 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(135 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.375s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(180 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(225 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.625s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(270 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(315 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.875s" repeatCount="indefinite"></animate></use></svg>
                </td>
              </tr>
              : data?.data?.map((d) => {
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