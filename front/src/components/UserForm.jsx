import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import userServices from '../services/userServices'

const { newUser, updateUser } = userServices

const UserForm = ({ data, update }) => {

  const [role, setRole] = useState("")
  const inpName = useRef(null)
  const inpEmail = useRef(null)
  const inpDni = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newData = {
      name: inpName.current.value,
      email: inpEmail.current.value,
      dni: inpDni.current.value,
      role: { id: role }
    }

    if (update) {
      newData.id = data.id
      const resUpdate = await updateUser(newData)
      if (resUpdate?.success) {
        toast.success("Usuario modificado correctamente")
        setTimeout(() => { window.location = "/" }, 2000)
      } else {
        toast.error(resUpdate?.response?.data?.message)
      }
    } else {
      const res = await newUser(newData)

      if (res?.success) {
        document.getElementById("formUser").reset()
        toast.success("Usuario agregado correctamente");
      } else {
        toast.error(res?.message?.message);
      }
    }
  }

  if (data?.role?.id === 1) {
    document.getElementById("inpAdmin").defaultChecked = true
  } else if (data?.role?.id === 2) {
    document.getElementById("inpUser").defaultChecked = true
  } else {
    document.getElementsByName("role").forEach((e) => e.defaultChecked = false)
  }

  useEffect(() => {
    if (data) {
      setRole(data?.role?.id)
    }
  }, [data?.dni])

  return (
    <div className='flex flex-col justify-start items-center w-full'>
      <form id='formUser' className='self-center grid grid-cols-1 w-full max-w-[650px]'>
        <label className='flex flex-col mb-10 gap-3 w-full px-10 justify-between'>
          <span className='text-xl'>Apellido y nombre:</span>
          <input type="text" className='pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md' ref={inpName} defaultValue={data ? data?.name : ""} />
        </label>
        <label className='flex flex-col mb-10 gap-3 w-full px-10 justify-between'>
          <span className='text-xl'>Email:</span>
          <input type="email" className='pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md' ref={inpEmail} defaultValue={data ? data?.email : ""} />
        </label>
        <label className='flex flex-col mb-10 gap-3 w-full px-10 justify-between'>
          <span className='text-xl'>Dni:</span>
          <input onWheel={(e) => e.target.blur()} type="number" className='pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md' ref={inpDni} defaultValue={data ? data?.dni : ""} />
        </label>
        <label className='flex flex-col mb-10 gap-8 w-full px-10 justify-between'>
          <span className='text-xl'>Rol de usuario:</span>
          <div className='flex gap-10 justify-center'>
            <label>
              <input className='peer hidden' id='inpAdmin' type="radio" value='1' name='role' onClick={(e) => { setRole(e.target.value) }} />
              <p className='peer-checked:bg-[#3c7720] peer-checked:text-[#e7f0f8] cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-[#6374ae] peer-checked:border-[#e7f0f8]'>Admin</p>
            </label>
            <label>
              <input className='peer hidden' id='inpUser' type="radio" value='2' name='role' onClick={(e) => { setRole(e.target.value) }} />
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