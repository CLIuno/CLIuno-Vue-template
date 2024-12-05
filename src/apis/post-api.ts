import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_URL

// The postApi object contains methods to interact with the post endpoints of the backend.
const postApi = {
  getCurrentUserPosts: () => axios.get(`${BASE_URL}/posts/current-user`),
  getAllPosts: () => axios.get(`${BASE_URL}/posts`),
  getPostById: (id: string) => axios.get(`${BASE_URL}/posts/${id}`),
  createPost: (postData: any) => axios.post(`${BASE_URL}/posts`, postData),
  updatePostById: (id: string, postData: any) => axios.patch(`${BASE_URL}/posts/${id}`, postData),
  deletePostById: (id: string) => axios.delete(`${BASE_URL}/posts/${id}`),
  getUsersByPost: (postId: string) => axios.get(`${BASE_URL}/posts/${postId}/user`)
}

export default postApi
