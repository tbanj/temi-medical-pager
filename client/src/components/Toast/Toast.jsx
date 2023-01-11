import type { ToastContent, ToastOptions } from "react-toastify";
import { toast } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Toast = (message: ToastContent, option: ToastOptions = {}) => {
  toast(message, { ...defaultOptions, ...option });
};

export default Toast;
