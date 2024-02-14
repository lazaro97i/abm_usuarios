import React, { useEffect, useRef, useState } from "react"
import UserForm from "../components/UserForm"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const API_URL = import.meta.env.VITE_APP_API_URL

const UpdateUser = () => {

    const [data, setData] = useState({})
    const [isUpdate, setIsUpdate] = useState(true)
    const params = useParams()
    const inpDni = useRef(null)

    useEffect(() => {
        setData({})
        if (params?.dni) {
            getUser(params?.dni)
            document.getElementById("searchDni").value = params.dni
        } else {
            document.getElementById("searchDni").value = ""
        }
    }, [params])

    const getUser = async (dni) => {
        try {
            let res = await axios.get(`${API_URL}/${dni}`)
            if (res?.data?.success) {
                setData(res?.data?.data)
                setIsUpdate(true)
                toast.success(res.data.message)
            }
        } catch (e) {
            toast.error(e.response.data.message)
            console.log(e)
        }
    }

    const handleSearch = async () => {
        try {
            const res = getUser(inpDni.current.value)
            setData(res?.data?.data)
            if (res?.data?.success) {
                setIsUpdate(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            <h2 className='text-3xl mb-20 mt-10 underline text-[#262c40]'>Modificar usuario</h2>
            <label className="mb-10 flex justify-center items-center gap-5 flex-wrap mx-8">
                <span>Ingresar Dni:</span>
                <div className="flex flex-nowrap gap-3">
                    <input ref={inpDni} type="search" name="searchDni" id="searchDni" className="pl-3 outline-none bg-transparent border-b border-[#6374ae] rounded-b-md" />
                    <span onClick={handleSearch} className="cursor-pointer">
                        <svg width={"30px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#262c40"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#262c40" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </span>
                </div>
            </label>
            <UserForm
                data={data}
                update={isUpdate}
            />
        </div>
    )
}


export default UpdateUser