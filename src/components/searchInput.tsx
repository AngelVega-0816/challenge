import { Button, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import usePostsStore from "../store/postsStore.store";

const SearchInput = () => {
  const [val, setVal] = useState("");
  const { setSearchCriteria } = usePostsStore();

  return (
    <Stack direction="row" margin="auto">
      <TextField
        placeholder="Search..."
        onChange={(e) => setVal(e.target.value)}
        sx={{
          border: "1px solid black",
          ".MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          input: {
            p: 1,
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px white inset",
              WebkitTextFillColor: "black",
            },
          },
          ".MuiFormLabel-root": {
            transform: "translate(8px, 8px) scale(1)",
          },
          ".MuiFormLabel-root.Mui-focused, .MuiFormLabel-root.MuiInputLabel-shrink":
            {
              transform: "translate(14px, -9px) scale(0.75)",
            },
        }}
      />
      <Button
        sx={({ palette }) => ({
          border: "1px solid black",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: palette.text.primary,
        })}
        onClick={() => setSearchCriteria(val)}
      >
        <SearchIcon />
      </Button>
    </Stack>
  );
};

export default SearchInput;
