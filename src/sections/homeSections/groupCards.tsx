import { Grid, Stack } from "@mui/material";
import Card from "../../components/card";
import usePostsStore from "../../store/postsStore.store";

const GroupCards = () => {
  const { posts } = usePostsStore();
  return (
    <Stack>
      <Grid container justifyContent="center" sx={{ px: 3, py: 3 }}>
        {posts.map((post) => (
          <Grid
            item
            key={post.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            sx={{
              minWidth: "300px",
              maxWidth: "350px",
              display: "flex",
              justifyContent: "center",
            }}
            spacing={1}
          >
            <Card {...post} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default GroupCards;
