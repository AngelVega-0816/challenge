import { create } from "zustand";
import { Roles } from "../service/auth.service";
import { errorMessages } from "../utils/messages";
import { emailRegExp, passwordMinLength } from "../utils/constants";

export interface FormAuth {
  email: string;
  password: string;
  rol: Roles | null;

  errorEmail: string;
  errorPassword: string;
  errorRol: string;

  invalidCredentials: string,

  validateField: (key: keyof FormAuth, value: string | Roles | null) => void;
  setErrors: (errors: {
    errorEmail: boolean;
    errorPassword: boolean;
    errorRol: boolean;
  }) => void;
  setInvalidCredentials: (val: boolean) => void;
  reset: () => void,
}

const useFormAuthStore = create<FormAuth>((set) => ({
  email: "",
  password: "",
  rol: null,

  errorEmail: "",
  errorPassword: "",
  errorRol: "",
  
  invalidCredentials: "",

  validateField: (key: keyof FormAuth, value: string | Roles | null) => {
    set((state) => {
      let error = "";
      
      switch (key) {
        case "email":
          if (!value) {
            error = errorMessages.emptyEmail;
          } else if (typeof value === "string" && !emailRegExp.test(value)) {
            error = errorMessages.invalidEmail;
          }
          break;
        case "password":
          if (!value) {
            error = errorMessages.emptyPassword;
          } else if (typeof value === "string" && value.length < passwordMinLength) {
            error = errorMessages.shortPassword;
          }
          break;
        case "rol":
          error = value ? "" : errorMessages.emptyRol;
          break;
        default:
          break;
      }

      return {
        ...state,
        [key]: value,
        [`error${key.charAt(0).toUpperCase() + key.slice(1)}`]: error,
      };
    });
  },

  setErrors: (errors) => set((prev) => ({
    errorEmail: errors.errorEmail ? errorMessages.emptyEmail : prev.errorEmail,
    errorPassword: errors.errorPassword ? errorMessages.emptyPassword : prev.errorPassword,
    errorRol: errors.errorRol ? errorMessages.emptyRol : prev.errorRol,    
  })),

  setInvalidCredentials: (val: boolean) => set(() => ({
    invalidCredentials: val ? errorMessages.invalidCredentials : ""
  })),

  reset: () => set(() => ({
    email: "",
    password: "",
    rol: null,

    errorEmail: "",
    errorPassword: "",
    errorRol: "",
  
    invalidCredentials: ""
  })),
})
);

export default useFormAuthStore;
