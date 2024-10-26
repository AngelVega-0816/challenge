import { TextField, TextFieldProps } from "@mui/material";

const BaseInputText = ({ ...rest }: TextFieldProps) => {
  return (
    <TextField
      {...rest}
      sx={{
        ...rest.sx,
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
    />
  );
};

export default BaseInputText;
