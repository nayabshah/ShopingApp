import Select from "react-select";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { MdAddToPhotos } from "react-icons/md";
import Button from "@mui/material/Button";
import { colors, categories, sizes } from "./filters";
import IconButton from "@mui/material/IconButton";
import { MdClear } from "react-icons/md";

import AddProductModal from "./AddProductModal";
import { useDispatch } from "react-redux";
import { getProduct, setProductsList } from "../reducers/productReducers";

const Header = () => {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();

  return (
    <div className="filter-options">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Select
          options={categories}
          defaultValue={categories[0]}
          style={{ marginRight: "10px" }}
          onChange={(e) => setCategory(e)}
          name=""
        />

        <Select
          options={colors}
          defaultValue={colors[0]}
          onChange={(e) => setColor(e)}
          style={{ marginRight: "10px" }}
          name="color"
        />
        <Select
          options={sizes}
          defaultValue={sizes[0]}
          name="size"
          onChange={(e) => setSize(e)}
          style={{ margin: "10px" }}
        />
        <button
          className="search-button"
          onClick={() => {
            dispatch(
              getProduct({
                category: category.value ? category.value : "",
                color: color.value ? color?.value : "",
                size: size.value ? size.value : "",
                title,
              })
            );
            setIsFiltered(true);
          }}
        >
          Filter
        </button>
        {isFiltered ? (
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(setProductsList(null))}
          >
            <MdClear />
          </IconButton>
        ) : null}
      </div>
      <div>
        <input
          type="search"
          className="search-input"
          placeholder="Search products"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button
          className="search-button"
          onClick={() => {
            dispatch(
              getProduct({
                title,
              })
            );
          }}
        >
          Search
        </button>
      </div>
      <Stack>
        <Button
          variant="outlined"
          startIcon={<MdAddToPhotos />}
          onClick={handleOpen}
        >
          Open modal
        </Button>
      </Stack>
      {open ? <AddProductModal open={open} setOpen={setOpen} /> : null}
    </div>
  );
};

export default Header;
