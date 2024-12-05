import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// The permissionApi object contains methods to interact with the permission endpoints of the backend.
const permissionApi = {
  getAllPermissions: () => axios.get(`${BASE_URL}/permissions`),
  getPermissionById: (id: string) => axios.get(`${BASE_URL}/permissions/${id}`),
  createPermission: (permissionData: any) => axios.post(`${BASE_URL}/permissions`, permissionData),
  updatePermissionById: (id: string, permissionData: any) =>
    axios.patch(`${BASE_URL}/permissions/${id}`, permissionData),
  deletePermissionById: (id: string) => axios.delete(`${BASE_URL}/permissions/${id}`),
  getRolesByPermission: (permissionId: string) => axios.get(`${BASE_URL}/permissions/${permissionId}/roles`),
  getUsersByPermission: (permissionId: string) => axios.get(`${BASE_URL}/permissions/${permissionId}/users`)
}
export default permissionApi
