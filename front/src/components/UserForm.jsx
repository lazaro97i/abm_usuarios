import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import userServices from '../services/userServices'

const { newUser } = userServices

const UserForm = () => {

  const [role, setRole] = useState('')

  const inpName = useRef(null)
  const inpEmail = useRef(null)
  const inpDni = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: inpName.current.value,
      email: inpEmail.current.value,
      dni: inpDni.current.value,
      role: { id: role }
    }
    const res = await toast.promise(
      newUser(data),
      {
        loading: 'Creando usuario...',
        success: 'Usuario creado exitosamente!',
        error: 'Error al crear el usuario'
      }, { duration: 3000 }
    )
    if (res?.success) {
      document.getElementById("formNewUser").reset()
    }

  }

  return (
    <div className='flex flex-col justify-start items-center w-full'>
      <h2 className='text-3xl mb-20 mt-10 underline text-[#262c40]'>Agregar usuario</h2>
      <form id='formNewUser' className='self-center grid grid-cols-1 w-full max-w-[650px]'>
        <label className='flex flex-col mb-10 gap-3 w-full px-10 justify-between'>
          <span className='text-xl'>Apellido y nombre:</span>
          <input type="text" className='pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md' ref={inpName} />
        </label>
        <label className='flex flex-col mb-10 gap-3 w-full px-10 justify-between'>
          <span className='text-xl'>Email:</span>
          <input type="email" className='pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md' ref={inpEmail} />
        </label>
        <label className='flex flex-col mb-10 gap-3 w-full px-10 justify-between'>
          <span className='text-xl'>Dni:</span>
          <input onWheel={(e) => e.target.blur()} type="number" className='pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md' ref={inpDni} />
        </label>
        <label className='flex flex-col mb-10 gap-8 w-full px-10 justify-between'>
          <span className='text-xl'>Rol de usuario:</span>
          <div className='flex gap-10 justify-center'>
            <label>
              <input className='peer hidden' type="radio" value='1' name='role' onClick={(e) => { setRole(e.target.value) }} />
              <p className='peer-checked:bg-[#3c7720] peer-checked:text-[#e7f0f8] cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-[#6374ae] peer-checked:border-[#e7f0f8]'>Admin</p>
            </label>
            <label>
              <input className='peer hidden' type="radio" value='2' name='role' onClick={(e) => { setRole(e.target.value) }} />
              <p className='peer-checked:bg-[#3c7720] peer-checked:text-[#e7f0f8] cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-[#6374ae] peer-checked:border-[#e7f0f8]'>Usuario</p>
            </label>
          </div>
        </label>
        <label className='flex justify-center items-center mt-10 mb-10'>
          <button onClick={handleSubmit} className='bg-[#6374ae] py-2 px-8 text-[#e7f0f8] rounded-sm active:bg-[#839dd1]'>
            Aceptar
          </button>
        </label>
      </form>
    </div>
  )
}

export default UserForm