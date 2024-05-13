import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.scss";
import { getProducts } from "../../services/productService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const handleCreateClick = () => {
    navigate("/products/create");
  };
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Function to convert uppercase strings to title case
  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
  };

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {});
  }, []);

  if (!products) {
    return <div className="contracts-container">Loading products</div>;
  }

  return (
    <div className="contracts-container">
      <div className="create-button-row">
        <div className="create-button" onClick={handleCreateClick}>
          Create Product
        </div>
      </div>
      <h3>{products.length} products available</h3>
      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <h2>{product.productName}</h2>
            <p>
              Compatible with:{" "}
              {product.compatibility.map((c) => toTitleCase(c)).join(", ")}
            </p>
            <p>
              Starting at:{" "}
              {Math.min(
                ...product.durationOptions.map((option) =>
                  parseFloat(option.price)
                )
              )}{" "}
              EUR
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
