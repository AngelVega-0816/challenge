import { Pagination as PaginationComp, Stack } from "@mui/material";
import usePostsStore from "../store/postsStore.store";

const Pagination = () => {
  const { totalPages, currentPage, setCurrentPage } = usePostsStore();
  return (
    <Stack pb={5} margin="auto">
      <PaginationComp
        count={totalPages}
        page={currentPage}
        onChange={(_e, val) => setCurrentPage(val)}
        color="primary"
      />
    </Stack>
  );
};

export default Pagination;
