import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// The roleApi object contains methods to interact with the role endpoints of the backend.
const roleApi = {
  getAllRoles: () => axios.get(`${BASE_URL}/roles`),
  getRoleById: (id: string) => axios.get(`${BASE_URL}/roles/${id}`),
  createRole: (roleData: any) => axios.post(`${BASE_URL}/roles`, roleData),
  updateRoleById: (id: string, roleData: any) => axios.patch(`${BASE_URL}/roles/${id}`, roleData),
  deleteRoleById: (id: string) => axios.delete(`${BASE_URL}/roles/${id}`),
  getPermissionsByRole: (roleId: string) => axios.get(`${BASE_URL}/roles/${roleId}/permissions`),
  getUsersByRole: (roleId: string) => axios.get(`${BASE_URL}/roles/${roleId}/users`)
}

export default roleApi
