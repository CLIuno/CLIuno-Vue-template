import http from './http'

const authApi = {
  login: (credentials: any) => http.post('/auth/login', credentials),
  register: (userData: any) => http.post('/auth/register', userData),
  logout: () => http.post('/auth/logout'),
  forgotPassword: (email: string) => http.post('/auth/forgot-password', { email }),
  resetPassword: (password: string, token: string) =>
    http.post('/auth/reset-password', { password, token }),
  changePassword: (oldPassword: string, newPassword: string) =>
    http.post('/auth/change-password', { oldPassword, newPassword }),
  verifyEmail: (token: string) => http.post('/auth/verify-email', { token }),
  sendVerificationEmail: () => http.post('/auth/send-verify-email'),
  checkToken: (token: string) => http.post('/auth/check-token', { token }),
  refreshToken: (refreshToken: string) => http.post('/auth/refresh-token', { refreshToken }),
  verifyOTP: (otp: string) => http.post('/auth/otp/verify', { otp }),
  disableOTP: () => http.post('/auth/otp/disable'),
  validateOTP: (otp: string) => http.post('/auth/otp/validate', { otp }),
  generateOTP: () => http.post('/auth/otp/generate'),
}

export default authApi
