import { Button, ButtonProps } from "@mui/material";

const CustomButton = ({ ...rest }: ButtonProps) => {
  return <Button {...rest}>{rest.children}</Button>;
};

export default CustomButton;
