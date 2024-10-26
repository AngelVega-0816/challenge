import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useAuthStore from "../store/auth.store";
import usePostsStore from "../store/postsStore.store";

const CustomSpeedDial = () => {
  const { signOutStore, rol } = useAuthStore();
  const { setShowModal, setTypeForm } = usePostsStore();
  const actions = [
    {
      icon: (
        <AddCircleOutlineIcon
          onClick={() => {
            setTypeForm("create");
            setShowModal();
          }}
        />
      ),
      name: "Create post",
      rol: ["admin"],
    },
    {
      icon: <LogoutIcon onClick={signOutStore} />,
      name: "Log-out",
      rol: ["user", "admin"],
    },
  ];

  return (
    <Box sx={{ transform: "translateZ(0px)" }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", left: 16, top: 16 }}
        icon={<SpeedDialIcon />}
        direction="down"
      >
        {actions
          .filter((action) => action.rol.includes(rol || "user"))
          .map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
      </SpeedDial>
    </Box>
  );
};

export default CustomSpeedDial;
