import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

const authApi = {
  login: (credentials: any) => axios.post(`${BASE_URL}/auth/login`, credentials),
  register: (userData: any) => axios.post(`${BASE_URL}/auth/register`, userData),
  logout: () => axios.post(`${BASE_URL}/auth/logout`),
  me: () => axios.get(`${BASE_URL}/auth/me`)
}

export default authApi
