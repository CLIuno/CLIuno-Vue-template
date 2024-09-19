import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// The userApi object contains methods to interact with the user endpoints of the backend.
const userApi = {
  getCurrentUser: () => axios.get(`${BASE_URL}/users/current`),
  getUsers: () => axios.get(`${BASE_URL}/users`),
  getUserByUsername: (username: string) => axios.get(`${BASE_URL}/users/username/${username}`),
  getUserById: (id: string) => axios.get(`${BASE_URL}/users/${id}`),
  updateUserById: (id: string, userData: any) => axios.patch(`${BASE_URL}/users/${id}`, userData),
  deleteUserById: (id: string) => axios.delete(`${BASE_URL}/users/${id}`),
  getPermissionsByUser: (userId: string) => axios.get(`${BASE_URL}/users/${userId}/permissions`),
  getPostsByUser: (userId: string) => axios.get(`${BASE_URL}/users/${userId}/posts`),
  getRolesByUser: (userId: string) => axios.get(`${BASE_URL}/users/${userId}/roles`),
  getCommentsByUser: (userId: string) => axios.get(`${BASE_URL}/users/${userId}/comments`)
}

export default userApi
