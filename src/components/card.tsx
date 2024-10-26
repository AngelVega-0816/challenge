import {
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import usePostsStore from "../store/postsStore.store";
import { TypePost } from "../service/posts.service";

const Card = ({ title, body, id }: TypePost) => {
  const { setShowModal, getPostStore, setTypeForm } = usePostsStore();
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "-webkit-fill-available",
          // flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h4"
          px={3}
          textAlign="center"
          sx={{
            wordWrap: "break-word",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            wordWrap: "break-word",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setTypeForm("update");
            setShowModal();
            getPostStore(id);
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Stack>
  );
};

export default Card;
