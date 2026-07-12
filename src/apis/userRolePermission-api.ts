import http from './http'

const userRolePermissionApi = {
  getAllUserRolePermissions: () => http.get('/user-role-permissions'),
  getUserRolePermissionById: (id: string) => http.get(`/user-role-permissions/${id}`),
  createUserRolePermission: (userRolePermissionData: Record<string, unknown>) =>
    http.post('/user-role-permissions', userRolePermissionData),
  updateUserRolePermissionById: (id: string, userRolePermissionData: Record<string, unknown>) =>
    http.patch(`/user-role-permissions/${id}`, userRolePermissionData),
  deleteUserRolePermissionById: (id: string) => http.delete(`/user-role-permissions/${id}`),
}

export default userRolePermissionApi
