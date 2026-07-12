import http from './http'

const userApi = {
  getCurrentUser: () => http.get('/users/current'),
  getUsers: () => http.get('/users'),
  getUserByUsername: (username: string) => http.get(`/users/username/${username}`),
  getUserById: (id: string) => http.get(`/users/${id}`),
  updateUserById: (id: string, userData: any) => http.patch(`/users/${id}`, userData),
  deleteUserById: (id: string) => http.delete(`/users/${id}`),
  getPostsByUser: (userId: string) => http.get(`/users/${userId}/posts`),
  getRolesByUser: (userId: string) => http.get(`/users/${userId}/roles`),
}

export default userApi
