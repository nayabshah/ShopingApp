import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";

import { colors, categories, sizes } from "./filters";
import { useDispatch } from "react-redux";
import { createProduct } from "../reducers/productReducers";

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

const AddProductModal = ({ open, setOpen }) => {
  const [categoriesState, setCategories] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [colorsState, setColors] = useState("");
  const [sizeState, setSize] = useState("");
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        category: categoriesState.value,
        color: colorsState.value,
        size: sizeState.value,
        price,
        title,
      };

      dispatch(createProduct(formData));
      handleClose();
      toast.success("New Product Added");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box>
            <label htmlFor="title">Title</label>
            <input
              className="form-input"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
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
              defaultValue={categories[0]}
              onChange={(e) => setCategories(e)}
            />

            <Select
              options={colors}
              defaultValue={colors[0]}
              onChange={(e) => setColors(e)}
            />
            <Select
              options={sizes}
              defaultValue={sizes[0]}
              onChange={(e) => setSize(e)}
            />
          </div>
          <button className="search-button" type="submit">
            Submit
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
