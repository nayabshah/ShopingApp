import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
const initialState = {
  products: null,
  isError: false,
  isSuccess: false,
  message: "",
  currentPage: 1,
};

export const getProduct = createAsyncThunk(
  "product/get",
  async (params, thunkAPI) => {
    try {
      return productService.getProduct(params);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toStrinf();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (productData) => {
    try {
      return productService.createProduct(productData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toStrinf();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete a goal
export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  try {
    return productService.deleteProduct(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toStrinf();
    return thunkAPI.rejectWithValue(message);
  }
});

// delete a goal
export const updateProduct = createAsyncThunk(
  "product/update",
  async (data) => {
    try {
      return productService.updateProduct(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toStrinf();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setProductsList: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? { ...action.payload } : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  reset,
  setProductsList,
  setCurrentPage,
  setCategory,
  setColor,
  setSize,
  setTitle,
} = productsSlice.actions;
export default productsSlice.reducer;
