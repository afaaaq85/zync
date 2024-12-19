
interface ToastProps {
  showToast: boolean;
  toastMessage: string;
  variant:string
}

const Toast = ({ showToast, toastMessage ,variant}: ToastProps) => {
  return (
    <div className={`popup-toast ${variant} ${showToast ? "show" : ""}`}>{toastMessage}</div>
  )
}

export default Toast