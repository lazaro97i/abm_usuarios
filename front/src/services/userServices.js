import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

const getUsers = async () => {

  try {
    const response = await axios.get(`${API_URL}`)
    return response.data
  } catch (e) {
    console.log(e)
    return {
      respoonse: null,
      message: 'Usuarios no encontrados',
      success: false
    }
  }

}

const newUser = async (data) => {

  try {
    const response = await axios.post(`${API_URL}`, data)
    return response.data
  } catch (e) {
    console.log(e)
    return {
      respoonse: null,
      message: e.response.data,
      success: false
    }
  }

}

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
    return {
      respoonse: null,
      message: e.response.data,
      success: false
    }
  }
}

const userServices = {
  getUsers,
  newUser,
  deleteUser
}

export default userServices