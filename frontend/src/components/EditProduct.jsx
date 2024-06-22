import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { colors, categories, sizes } from "./filters";
import { useDispatch } from "react-redux";
import { setProductsList, updateProduct } from "../reducers/productReducers";
import { CiEdit } from "react-icons/ci";

import Select from "react-select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  color: "black",
  width: "800px",
};

export default function EditProductModal({ product }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const [categoriesState, setCategories] = useState(
    categories.filter((cat) => cat.value === product.category)[0]
  );
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [colorsState, setColors] = useState(
    colors.filter((cat) => cat.value === product.color)[0]
  );
  const [sizeState, setSize] = useState(
    sizes.filter((siz) => siz.value === product.size)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      category: categoriesState.value,
      color: colorsState.value,
      size: sizeState.value,
      price,
      title,
      id: product._id,
    };

    dispatch(updateProduct(formData));
    setOpen(!open);
    // dispatch(setProductsList(null));
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          backgroundColor: "green",
          padding: "5px",
          border: "none",
          borderRadius: "2px",
          position: "absolute",
          bottom: "100px",
          right: "-10px",
        }}
      >
        <CiEdit fill="white" size={20} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              className="form-input"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="price">Price</label>
            <input
              className="form-input"
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="filter-options">
              <Select
                options={categories}
                defaultValue={categoriesState}
                onChange={(e) => setCategories(e)}
              />

              <Select
                options={colors}
                defaultValue={colorsState}
                onChange={(e) => setColors(e)}
              />
              <Select
                options={sizes}
                defaultValue={sizeState}
                onChange={(e) => setSize(e)}
              />
            </div>
            <button className="search-button" type="submit">
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
