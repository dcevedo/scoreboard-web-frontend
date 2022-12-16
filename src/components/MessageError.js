import  { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ErrorMessage = ({msg,title}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (visible) {
      MySwal.fire({
        icon: 'error',
        title: title,
        text: msg,
      })
    }
    setVisible(false);
  }, [visible,msg,title])
  

}

export default ErrorMessage