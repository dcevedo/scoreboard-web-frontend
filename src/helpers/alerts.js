import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const LogoutAlert = () => {
  MySwal.fire({
    icon: 'success',
    title: "Has cerrado sesión correctamente",
  })
}
const alerts = {
  LogoutAlert
}

export default alerts;