import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// Define your API endpoints here
const userApi = {
  getUsers: () => axios.get(`${BASE_URL}/users`),
  getUser: (userId: string) => axios.get(`${BASE_URL}/users/${userId}`),
  createUser: (userData: any) => axios.post(`${BASE_URL}/users`, userData),
  updateUser: (userId: string, userData: any) => axios.put(`${BASE_URL}/users/${userId}`, userData),
  deleteUser: (userId: string) => axios.delete(`${BASE_URL}/users/${userId}`)
}

export default userApi
