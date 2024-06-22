import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../reducers/productReducers";

import EditProductModal from "./EditProduct";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="product"
      style={{
        position: "relative",
      }}
    >
      <img
        src="https://i.ibb.co/mGq0B4Q/human-kind.jpg"
        alt="Human Kind Be Both"
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>

        <button
          onClick={() => {
            dispatch(deleteProduct(product.id));
          }}
          style={{
            backgroundColor: "red",
            padding: "5px",
            border: "none",
            borderRadius: "2px",
            position: "absolute",
            top: "0",
            right: "0px",
          }}
        >
          <MdDelete fill="white" size={20} />
        </button>
        <EditProductModal product={product} />
      </div>
    </div>
  );
};

export default ProductItem;
