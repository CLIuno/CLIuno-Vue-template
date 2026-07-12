import http from './http'

const roleApi = {
  getAllRoles: () => http.get('/roles'),
  getRoleById: (id: string) => http.get(`/roles/${id}`),
  createRole: (roleData: Record<string, unknown>) => http.post('/roles', roleData),
  updateRoleById: (id: string, roleData: Record<string, unknown>) =>
    http.patch(`/roles/${id}`, roleData),
  deleteRoleById: (id: string) => http.delete(`/roles/${id}`),
  getPermissionsByRole: (roleId: string) => http.get(`/roles/${roleId}/permissions`),
  getUsersByRole: (roleId: string) => http.get(`/roles/${roleId}/users`),
}

export default roleApi
