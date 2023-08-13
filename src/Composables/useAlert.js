import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
//
export async function useToast({
  icon = 'success',
  title = 'Signed in successfully',
  position = 'top-end',
  ...options
} = {}) {
  await Toast.fire({ icon, title, position, ...options })
}
export default async function useAlert({
  title = 'Are you sure?',
  text = 'Do you want to continue',
  icon = 'error',
  confirmButtonText = 'Yes',
  timer = 5000,
  background = '#424242',
  color = '#fff',
  showCancelButton = true,
  cancelButtonText = 'Cancel',
  cancelButtonColor = '#d33',
  denyButtonText = `Don't save`,
  showDenyButton = false,
  confirmButtonColor = '#3085d6',
  reverseButtons = true,
  allowOutsideClick = true,
  allowEscapeKey = false,
  ...options
} = {}) {
  return await Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    timer,
    background,
    color,
    showCancelButton,
    cancelButtonText,
    cancelButtonColor,
    denyButtonText,
    showDenyButton,
    confirmButtonColor,
    reverseButtons,
    allowOutsideClick,
    allowEscapeKey,
    ...options
  })
}
