import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = () => (
  <ToastContainer position="top-right" hideProgressBar newestOnTop theme="light" autoClose={1000} />
)
export default Toast
