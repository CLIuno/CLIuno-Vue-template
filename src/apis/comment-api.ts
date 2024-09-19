import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// The commentApi object contains methods to interact with the comment endpoints of the backend.
const commentApi = {
  getAllComments: () => axios.get(`${BASE_URL}/comments`),
  getCommentById: (id: string) => axios.get(`${BASE_URL}/comments/${id}`),
  createComment: (commentData: any) => axios.post(`${BASE_URL}/comments`, commentData),
  updateCommentById: (id: string, commentData: any) => axios.patch(`${BASE_URL}/comments/${id}`, commentData),
  deleteCommentById: (id: string) => axios.delete(`${BASE_URL}/comments/${id}`),
  getUsersByComment: (commentId: string) => axios.get(`${BASE_URL}/comments/${commentId}/user`)
}

export default commentApi
