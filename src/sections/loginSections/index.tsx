import { FormHelperText, Stack, Typography } from "@mui/material";
import FormAuth from "../../components/formAuth";
import useAuthStore from "../../store/auth.store";
import CustomSwitch from "../../components/customSwitch";
import { useState } from "react";
import useFormAuthStore from "../../store/formAuth.store";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/paths";

type TypeForm = "sign-in" | "sign-up";

const FormLogin = () => {
  const [typeForm, setTypeForm] = useState<TypeForm>("sign-in");
  const { signInStore, signUpStore } = useAuthStore();
  const {
    email,
    errorEmail,
    password,
    errorPassword,
    rol,
    errorRol,
    setErrors,
    invalidCredentials,
    setInvalidCredentials,
    reset,
  } = useFormAuthStore();
  const navigate = useNavigate();

  const handleSubmitSignIn = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const hasErrors =
      errorEmail !== "" ||
      errorPassword !== "" ||
      (typeForm === "sign-up" && errorRol !== "");
    const isEmptyFields =
      !email || !password || (typeForm === "sign-up" && !rol);

    if (hasErrors || isEmptyFields) {
      setErrors({
        errorEmail: !email,
        errorPassword: !password,
        errorRol: typeForm === "sign-up" && !rol,
      });
      return;
    }

    if (typeForm === "sign-in") {
      await signInStore(email, password, () => {
        if (invalidCredentials) setInvalidCredentials(false);
        navigate(path.home);
        reset();
      }).catch(() => {
        setInvalidCredentials(true);
      });
    } else if (typeForm === "sign-up") {
      await signUpStore(email, password, rol!).then(() => {
        navigate(path.home);
        reset();
      });
    }
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type: TypeForm = event.target.checked ? "sign-up" : "sign-in";
    setTypeForm(type);
    if (invalidCredentials) setInvalidCredentials(false);
  };

  return (
    <Stack direction="column" alignItems="center">
      <FormAuth variant={typeForm} handleSubmit={handleSubmitSignIn} />
      {invalidCredentials && (
        <FormHelperText error>{invalidCredentials}</FormHelperText>
      )}
      <Stack
        direction={"row"}
        spacing={1}
        alignItems="center"
        justifyContent={"center"}
      >
        <Typography variant="body1">Sign-in</Typography>
        <CustomSwitch onChange={handleToggle} />
        <Typography variant="body1">Sign-up</Typography>
      </Stack>
    </Stack>
  );
};

export default FormLogin;
