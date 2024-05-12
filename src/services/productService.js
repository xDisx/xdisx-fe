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
