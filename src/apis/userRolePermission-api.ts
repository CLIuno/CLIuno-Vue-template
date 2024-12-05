import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// The userRolePermissionApi object contains methods to interact with the user-role-permission endpoints of the backend.
const userRolePermissionApi = {
  getAllUserRolePermissions: () => axios.get(`${BASE_URL}/user-role-permissions`),
  getUserRolePermissionById: (id: string) => axios.get(`${BASE_URL}/user-role-permissions/${id}`),
  createUserRolePermission: (userRolePermissionData: any) =>
    axios.post(`${BASE_URL}/user-role-permissions`, userRolePermissionData),
  updateUserRolePermissionById: (id: string, userRolePermissionData: any) =>
    axios.patch(`${BASE_URL}/user-role-permissions/${id}`, userRolePermissionData),
  deleteUserRolePermissionById: (id: string) => axios.delete(`${BASE_URL}/user-role-permissions/${id}`)
}

export default userRolePermissionApi
