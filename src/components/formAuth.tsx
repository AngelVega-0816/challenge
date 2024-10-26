import { MenuItem, Stack, Typography } from "@mui/material";
import CustomButton from "./customButton";
import CustomSelect from "./customSelect";
import CustomInputText from "./customInputText";

interface TypeFormAuth {
  variant: "sign-in" | "sign-up";
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const FormAuth = ({ variant, handleSubmit }: TypeFormAuth) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      p={3}
      sx={{
        boxShadow: "0px 3px 16px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h3">{variant} to App</Typography>
      <CustomInputText label="email" name="email" type="email" />
      <CustomInputText label="password" name="password" type="password" />
      {variant === "sign-up" && (
        <CustomSelect label="rol user" name="rol">
          <MenuItem value={"user"}>User</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </CustomSelect>
      )}
      <CustomButton color="primary" variant="contained" type="submit">
        {variant == "sign-in" ? "log in" : "register"}
      </CustomButton>
    </Stack>
  );
};

export default FormAuth;
