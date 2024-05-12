import productApiClient from "../utils/productApiClient";

export function createProduct(
  productName,
  description,
  compatibility,
  durationOptions
) {
  return productApiClient.post("/product", {
    productName,
    description,
    compatibility,
    durationOptions,
  });
}

export const getProducts = () => {
  return productApiClient.get("/products");
};

export const getProduct = (id) => {
  return productApiClient.get(`/products/${id}`);
};
