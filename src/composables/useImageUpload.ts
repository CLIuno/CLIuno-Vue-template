import api from '@/apis'

// Shared by the profile avatar picker and the post composer: pick a file,
// push it to POST /uploads/image, get an absolute URL back.
export function useImageUpload() {
  const uploading = ref(false)
  const uploadError = ref<string | null>(null)

  async function uploadImage(file: File): Promise<string | null> {
    uploading.value = true
    uploadError.value = null
    try {
      const res = await api.upload.uploadImage(file)
      return res.data.data.url as string
    } catch (err: unknown) {
      uploadError.value = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Upload failed'
        : 'Upload failed'
      return null
    } finally {
      uploading.value = false
    }
  }

  return { uploading, uploadError, uploadImage }
}
