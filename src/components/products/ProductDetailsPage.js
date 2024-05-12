import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/productService";
import "./ProductDetails.scss";

const formatCurrency = (value, currency = "EUR") => {
  return `${value} ${currency}`; // Basic formatting, could be enhanced with Intl.NumberFormat
};

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getProduct(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch product details:", error);
        setError("Failed to fetch product details");
      });
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return (
      <div className="product-details-container">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <h1>{product.productName}</h1>
      <p>{product.description}</p>
      <h2>Compatibility</h2>
      <ul>
        {product.compatibility.map((comp, index) => (
          <li key={index}>{comp}</li>
        ))}
      </ul>
      <h2>Pricing Information</h2>
      <table>
        <thead>
          <tr>
            <th>Years</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {product.durationOptions.map((option, index) => (
            <tr key={index}>
              <td>{option.years}</td>
              <td>{formatCurrency(option.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailsPage;
