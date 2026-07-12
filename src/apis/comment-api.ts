import http from './http'

const commentApi = {
  getAllComments: () => http.get('/comments'),
  getCommentById: (id: string) => http.get(`/comments/${id}`),
  createComment: (commentData: Record<string, unknown>) => http.post('/comments', commentData),
  updateCommentById: (id: string, commentData: Record<string, unknown>) =>
    http.patch(`/comments/${id}`, commentData),
  deleteCommentById: (id: string) => http.delete(`/comments/${id}`),
  getUsersByComment: (commentId: string) => http.get(`/comments/${commentId}/user`),
}

export default commentApi
