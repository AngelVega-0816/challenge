import { Switch, SwitchProps } from "@mui/material";

const CustomSwitch = ({ ...rest }: SwitchProps) => {
  return (
    <Switch
      inputProps={{ "aria-label": "controlled" }}
      sx={({ palette }) => ({
        "& .MuiSwitch-track": {
          backgroundColor: palette.primary.main,
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: palette.primary.main,
        },
        "&.Mui-checked .MuiSwitch-track": {
          backgroundColor: palette.primary.main,
        },
        "&.Mui-checked .MuiSwitch-thumb": {
          backgroundColor: palette.secondary.main,
        },
      })}
      {...rest}
    />
  );
};

export default CustomSwitch;
