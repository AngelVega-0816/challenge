import {
  FormHelperText,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFormAuthStore from "../store/formAuth.store";

interface InputTextProps extends Omit<TextFieldProps, "error" | "helperText"> {
  type?: "email" | "password";
}

const CustomInputText = ({ type, ...rest }: InputTextProps) => {
  const { email, errorEmail, password, errorPassword, validateField } =
    useFormAuthStore();
  const [error, setError] = useState("");

  const validateInput = (name: "email" | "password", value: string) => {
    validateField(name, value);
  };

  useEffect(() => {
    if (type === "email") {
      setError(errorEmail);
    } else if (type === "password") {
      setError(errorPassword);
    } else {
      setError("");
    }
  }, [type, errorEmail, errorPassword]);

  return (
    <Stack>
      <TextField
        onChange={(e) =>
          validateInput(e.target.name as "email" | "password", e.target.value)
        }
        {...rest}
        sx={{
          input: {
            p: 1,
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px white inset",
              WebkitTextFillColor: "black",
            },
          },
          ".MuiFormLabel-root": {
            transform: "translate(8px, 8px) scale(1)",
          },
          ".MuiFormLabel-root.Mui-focused, .MuiFormLabel-root.MuiInputLabel-shrink":
            {
              transform: "translate(14px, -9px) scale(0.75)",
            },
        }}
        value={type === "email" ? email : password}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}{" "}
    </Stack>
  );
};

export default CustomInputText;
