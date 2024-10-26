import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { StyledMenu } from "./styledMenu";
import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import useAuthStore from "../store/auth.store";

export const CustomMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { signOutStore } = useAuthStore();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack width="fit-content">
      <Button
        id="custom-button"
        aria-controls="custom-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <StyledMenu
        id="custom-menu"
        MenuListProps={{
          "aria-labelledby": "custom-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            signOutStore();
            handleClose();
          }}
          disableRipple
        >
          <LogoutIcon />
          <Typography variant="body1">Log out</Typography>
        </MenuItem>
      </StyledMenu>
    </Stack>
  );
};

export default CustomMenu;
