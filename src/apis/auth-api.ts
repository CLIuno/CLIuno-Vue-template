import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// The authApi object contains methods to interact with the auth endpoints of the backend.
const authApi = {
  login: (credentials: any) => axios.post(`${BASE_URL}/auth/login`, credentials),
  register: (userData: any) => axios.post(`${BASE_URL}/auth/register`, userData),
  logout: () => axios.post(`${BASE_URL}/auth/logout`),
  forgotPassword: (email: string) => axios.post(`${BASE_URL}/auth/forgot-password`, { email }),
  resetPassword: (password: string, token: string) =>
    axios.post(`${BASE_URL}/auth/reset-password`, { password, token }),
  changePassword: (oldPassword: string, newPassword: string) =>
    axios.post(`${BASE_URL}/auth/change-password`, { oldPassword, newPassword }),
  verifyEmail: (token: string) => axios.post(`${BASE_URL}/auth/verify-email`, { token }),
  sendVerificationEmail: () => axios.post(`${BASE_URL}/auth/send-verify-email`),
  checkToken: (token: string) => axios.post(`${BASE_URL}/auth/check-token`, { token }),
  refreshToken: (refreshToken: string) => axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken }),
  verifyOTP: (otp: string) => axios.post(`${BASE_URL}/auth/otp/verify`, { otp }),
  disableOTP: () => axios.post(`${BASE_URL}/auth/otp/disable`),
  validateOTP: (otp: string) => axios.post(`${BASE_URL}/auth/otp/validate`, { otp }),
  generateOTP: () => axios.post(`${BASE_URL}/auth/otp/generate`)
}

export default authApi
