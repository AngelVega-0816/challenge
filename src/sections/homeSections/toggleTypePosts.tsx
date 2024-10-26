import { Stack, Typography } from "@mui/material";
import React from "react";
import CustomSwitch from "../../components/customSwitch";
import usePostsStore from "../../store/postsStore.store";

const ToggleTypePosts = () => {
  const { postsTypeDisplay, setPostsTypeDisplay } = usePostsStore();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.checked ? "created" : "api";
    setPostsTypeDisplay(type);
  };

  return (
    <Stack direction="row" alignItems="center" margin="auto">
      <Typography>Post API</Typography>
      <CustomSwitch
        checked={postsTypeDisplay === "created"}
        onChange={handleToggle}
      />
      <Typography>Post Created</Typography>
    </Stack>
  );
};

export default ToggleTypePosts;
