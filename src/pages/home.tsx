import { Stack, Typography } from "@mui/material";
import CustomSpeedDial from "../components/customSpeedDial";
import GroupCards from "../sections/homeSections/groupCards";
import usePostsStore from "../store/postsStore.store";
import { useEffect } from "react";
import SearchInput from "../components/searchInput";
import FormPost from "../components/formPost";
import Pagination from "../components/pagination";
import ToggleTypePosts from "../sections/homeSections/toggleTypePosts";

const Home = () => {
  const { uploaded, getPostsStore, postsTypeDisplay, countTotalPostsStore } =
    usePostsStore();

  useEffect(() => {
    getPostsStore();
  }, [getPostsStore]);

  useEffect(() => {
    countTotalPostsStore();
  }, [postsTypeDisplay]);

  return (
    <>
      <CustomSpeedDial />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        minHeight="100vh"
        maxWidth={1700}
      >
        <FormPost />
        <SearchInput />
        {uploaded ? <GroupCards /> : <Typography>Loading...</Typography>}
        <Stack justifyContent="center">
          <Pagination />
          <ToggleTypePosts />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
