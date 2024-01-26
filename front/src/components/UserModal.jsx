import React, { useState } from 'react'
import userServices from '../services/userServices'
import toast from 'react-hot-toast'

const { deleteUser } = userServices

const UserModal = ({ data, modal }) => {

  const [modalDelete, setModalDelete] = useState(false)

  const ConfirmDelete = ({ modalConfirm, modalDelete }) => {

    const handleDelete = async () => {
      const res = await toast.promise(deleteUser(data.id),
        {
          loading: 'Eliminando usuario...',
          success: 'Usuario eliminado correctamente',
          error: 'Error al eliminar usuario'
        }
      )
      if (res?.success) {
        setTimeout(() => {
          modalConfirm(false)
          modalDelete(false)
          location.reload()
        }, 1500)
      }
    }

    return (
      <div className='w-full h-screen bg-primary-950 bg-opacity-90 fixed top-0 left-0 flex justify-center items-center px-10 z-20'>
        <div className='flex flex-col p-5 justify-center items-center bg-primary-100 w-full rounded-md max-w-[400px]'>
          <p className='mt-5 mb-5 text-xl'>Desea eliminar al usuario</p>
          <p className='mb-5 text-2xl'>{data.name}?</p>
          <div className='flex w-full justify-center items-center gap-5 my-5'>
            <input onClick={() => { modalConfirm(false) }} className=' bg-primary-900 hover:bg-primary-800 text-primary-100 py-1 w-[100px] rounded-sm cursor-pointer ' type="button" value="Cancelar" />
            <input onClick={handleDelete} className=' bg-[#b91c1c] hover:bg-[#dc2626] text-primary-100 py-1 w-[100px] rounded-sm cursor-pointer ' type="button" value="Eliminar" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-screen bg-primary-950 bg-opacity-50 fixed top-0 left-0 flex justify-center items-center px-10 z-10'>
      <div className=' bg-primary-200 w-full flex flex-col justify-center items-center rounded-md p-5 relative max-w-[400px]'>
        <span className='absolute top-3 right-5 cursor-pointer' onClick={() => { modal(false) }}>
          <svg width={"35px"} viewBox="0 0 117 117" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <desc></desc> <defs></defs> <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"> <g fillRule="nonzero" id="cancel"> <path d="M58.5,116.6 C90.5,116.6 116.6,90.6 116.6,58.5 C116.6,26.4 90.5,0.4 58.5,0.4 C26.5,0.4 0.4,26.5 0.4,58.5 C0.4,90.5 26.5,116.6 58.5,116.6 Z M58.5,8.6 C86,8.6 108.4,31 108.4,58.5 C108.4,86 86,108.4 58.5,108.4 C31,108.4 8.6,86 8.6,58.5 C8.6,31 31,8.6 58.5,8.6 Z" fill="#414e6e" id="Shape"></path> <path d="M36.7,79.7 C37.5,80.5 38.5,80.9 39.6,80.9 C40.7,80.9 41.7,80.5 42.5,79.7 L58.5,63.7 L74.5,79.7 C75.3,80.5 76.3,80.9 77.4,80.9 C78.5,80.9 79.5,80.5 80.3,79.7 C81.9,78.1 81.9,75.5 80.3,73.9 L64.3,57.9 L80.3,41.9 C81.9,40.3 81.9,37.7 80.3,36.1 C78.7,34.5 76.1,34.5 74.5,36.1 L58.5,52.1 L42.5,36.1 C40.9,34.5 38.3,34.5 36.7,36.1 C35.1,37.7 35.1,40.3 36.7,41.9 L52.7,57.9 L36.7,73.9 C35.1,75.5 35.1,78.1 36.7,79.7 Z" fill="#414e6e" id="Shape"></path> </g> </g> </g></svg>
        </span>
        <section className='mt-10 grid grid-cols-3'>
          <h3 className='text-xl text-center mb-3 col-span-3'>{data.name}</h3>
          <p className='mr-5 underline font-semibold text-end col-span-1'>Dni:</p>
          <p className='col-span-2'>{data.dni}</p>
          <p className='mr-5 underline font-semibold text-end col-span-1'>Email:</p>
          <p className='col-span-2'>{data.email}</p>
          <p className='mr-5 underline font-semibold text-end col-span-1'>Rol:</p>
          <p className='col-span-2'>{data.role.id === 1 ? 'ADMIN' : 'USUARIO'}</p>
        </section>
        <div className='flex flex-nowrap justify-center items-center w-3/4 mt-10 mb-5 gap-x-5'>
          <input className=' bg-primary-900 hover:bg-primary-800 text-primary-100 py-1 w-[100px] rounded-sm cursor-pointer ' type="button" value="Modificar" />
          <input onClick={() => { setModalDelete(true) }} className=' bg-[#b91c1c] hover:bg-[#dc2626] text-primary-100 py-1 w-[100px] rounded-sm cursor-pointer ' type="button" value="Eliminar" />
        </div>
      </div>
      {
        modalDelete
          ? <ConfirmDelete
            modalConfirm={setModalDelete}
            modalDelete={modal}
          />
          : null
      }
    </div>
  )
}

export default UserModal