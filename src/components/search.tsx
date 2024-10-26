import { Button, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchStyled = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid grey",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  margin: "auto",
  marginTop: 16,
  marginBottom: 16,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  // height: "100%",
  // position: "absolute",
  // cursor: "pointer",
  // zIndex: 100,
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = () => {
  return (
    <SearchStyled>
      <Button
        sx={({ spacing }) => ({
          padding: 0,
          height: "100%",
          position: "absolute",
          zIndex: 10,
        })}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </Button>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchStyled>
  );
};

export default Search;
