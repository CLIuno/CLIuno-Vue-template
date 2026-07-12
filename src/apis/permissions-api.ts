import http from './http'

const permissionApi = {
  getAllPermissions: () => http.get('/permissions'),
  getPermissionById: (id: string) => http.get(`/permissions/${id}`),
  createPermission: (permissionData: Record<string, unknown>) =>
    http.post('/permissions', permissionData),
  updatePermissionById: (id: string, permissionData: Record<string, unknown>) =>
    http.patch(`/permissions/${id}`, permissionData),
  deletePermissionById: (id: string) => http.delete(`/permissions/${id}`),
  getRolesByPermission: (permissionId: string) => http.get(`/permissions/${permissionId}/roles`),
  getUsersByPermission: (permissionId: string) => http.get(`/permissions/${permissionId}/users`),
}
export default permissionApi
