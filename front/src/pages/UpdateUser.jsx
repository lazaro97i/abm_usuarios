import React, { useEffect, useRef, useState } from "react"
import UserForm from "../components/UserForm"
import { useParams } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

const UpdateUser = () => {

    const params = useParams()
    const [data, setData] = useState(null)

    const inpDni = useRef(null)

    if(params.dni !== ":"){
        useEffect(()=>{
            getUser()
        }, [params])
    }

    const getUser = async() =>{
        try{
            const res = await axios.get(`${API_URL}/${params.dni}`)
            setData(res?.data?.data)
        }catch(e){
            console.log(e)
        }
    }

    const handleSearch = async()=>{
        try{
            const res = await axios.get(`${API_URL}/${inpDni.current.value}`)
            setData(res?.data?.data)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            <h2 className='text-3xl mb-20 mt-10 underline text-[#262c40]'>Modificar usuario</h2>
            <label className="mb-10 flex justify-center items-center gap-5 flex-wrap mx-8">
                <span>Ingresar Dni:</span>
                <div className="flex flex-nowrap">
                <input ref={inpDni} type="search" name="searchDni" id="searchDni" className="pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md"/>
                <span onClick={handleSearch} className="cursor-pointer">B</span>
                </div>
            </label>
            <UserForm 
                data={data}
            />
        </div>
    )
}


export default UpdateUser