import axios from "axios";

const API_URL = "/api/v1/product";
function buildQueryString(params) {
  let queryString = "";

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      if (params[key] !== "") {
        if (queryString.length > 0) {
          queryString += "&";
        }
        queryString +=
          encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      }
    }
  }

  return queryString;
}
// Generate the query string from the filters object

const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);

  return response.data;
};

const getProduct = async (productData) => {
  const queryString = buildQueryString(productData);
  console.log(API_URL + "?" + queryString);
  const response = await axios.get(API_URL + "?" + queryString);
  return response.data;
};

const updateProduct = async (productData) => {
  const response = await axios.put(API_URL + "/" + productData.id, productData);

  return response.data;
};
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + "/" + id);

  return response.data;
};

const productService = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
export default productService;
