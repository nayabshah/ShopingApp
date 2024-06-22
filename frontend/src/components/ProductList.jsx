import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../reducers/productReducers";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { products, isError, message, isLoading } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      dispatch(getProduct());
    }
  }, [products]);
  return (
    <div className="products">
      {products && products.length > 0
        ? products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        : null}
    </div>
  );
};

export default ProductList;
