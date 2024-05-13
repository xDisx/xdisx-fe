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

export const getProducts = (searchParams) => {
  const params = new URLSearchParams({
    ...searchParams,
  });
  return productApiClient.get("/products", { params: params });
};

export const getProduct = (id) => {
  return productApiClient.get(`/products/${id}`);
};
