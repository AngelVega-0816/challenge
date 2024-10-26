import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import useFormAuthStore, { FormAuth } from "../store/formAuth.store";

const CustomSelect = ({ ...rest }: SelectProps) => {
  const { rol, errorRol, validateField } = useFormAuthStore();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { value, name } = event.target;
    validateField(name as keyof FormAuth, value as keyof FormAuth);
  };

  return (
    <FormControl
      fullWidth
      sx={{
        ".MuiSelect-select": {
          p: 1,
        },
        ".MuiFormLabel-root": {
          transform: "translate(8px, 8px) scale(1)",
        },
        ".MuiFormLabel-root.Mui-focused, .MuiFormLabel-root.MuiInputLabel-shrink":
          {
            transform: "translate(14px, -9px) scale(0.75)",
          },
      }}
    >
      {rest.label && (
        <InputLabel id="demo-simple-select-label">{rest.label}</InputLabel>
      )}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        {...rest}
        value={rol || ""}
        onChange={handleChange}
      >
        {rest.children}
      </Select>
      {errorRol && (
        <FormHelperText error sx={{ mx: 0 }}>
          {errorRol}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
