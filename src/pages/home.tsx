import { Stack, Typography } from "@mui/material";
import CustomSpeedDial from "../components/customSpeedDial";
import GroupCards from "../sections/homeSections/groupCards";
import usePostsStore from "../store/postsStore.store";
import { useEffect } from "react";
import SearchInput from "../components/searchInput";
import FormPost from "../components/formPost";
import Pagination from "../components/pagination";
import CustomSwitch from "../components/customSwitch";

const Home = () => {
  const {
    uploaded,
    getPostsStore,
    setPostsTypeDisplay,
    postsTypeDisplay,
    countTotalPostsStore,
  } = usePostsStore();

  useEffect(() => {
    getPostsStore();
  }, [getPostsStore]);

  useEffect(() => {
    countTotalPostsStore();
  }, [postsTypeDisplay]);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.checked ? "created" : "api";
    console.log("TYPE =>", type);
    setPostsTypeDisplay(type);
  };

  return (
    <Stack>
      <>
        <CustomSpeedDial />
        <FormPost />
        <SearchInput />
        {uploaded ? <GroupCards /> : <Typography>Loading...</Typography>}
        <Pagination />
        <Stack direction="row" alignItems="center" margin="auto">
          <Typography>Post API</Typography>
          <CustomSwitch
            checked={postsTypeDisplay === "created"}
            onChange={handleToggle}
          />
          <Typography>Post Created</Typography>
        </Stack>
      </>
    </Stack>
  );
};

export default Home;
