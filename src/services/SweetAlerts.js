import Swal from 'sweetalert2'
export default {
  successfulLogin () {
    Swal.fire({
      title: 'Success!',
      type: 'success',
      position: 'center',
      timer: 1000,
      showConfirmButton: false
    })
  },

  failureLogin () {
    Swal.fire({
      title: 'Error!',
      text: 'Error in login',
      type: 'error',
      timer: 1000,
      showConfirmButton: false
    })
  },

  noProjects () {
    Swal.fire({
      title: 'OOps!',
      text: 'You are not assigned to any Project',
      timer: 1500,
      type: 'warning',
      showConfirmButton: false
    })
  }
}
