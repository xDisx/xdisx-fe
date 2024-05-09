import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const handleCreateClick = () => {
    navigate("/products/create");
  };
  const navigate = useNavigate();

  return (
    <div className="contracts-container">
      <div className="create-button-row">
        <div className="create-button" onClick={handleCreateClick}>
          Create Product
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
