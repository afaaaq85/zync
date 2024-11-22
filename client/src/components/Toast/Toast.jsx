

const Toast = ({ showToast, toastMessage }) => {
  return (
    <div className={`popup-toast ${showToast ? "show" : ""}`}>{toastMessage}</div>
  )
}

export default Toast