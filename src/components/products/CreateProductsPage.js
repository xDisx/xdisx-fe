import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProducts.scss";
import { createProduct } from "../../services/productService";

const CreateProductsPage = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [compatibility, setCompatibility] = useState([]);
  const [durationOptions, setDurationOptions] = useState([
    { years: "", price: "" },
  ]);
  const [serviceUnavailableMessage, setServiceUnavailableMessage] =
    useState("");

  const navigate = useNavigate();

  const handleCompatibilityChange = (deviceType) => {
    setCompatibility(
      compatibility.includes(deviceType)
        ? compatibility.filter((type) => type !== deviceType)
        : [...compatibility, deviceType]
    );
  };

  const handleDurationChange = (index, field, value) => {
    const updatedOptions = durationOptions.map((option, idx) => {
      if (idx === index) {
        if (field === "price") {
          const numericValue = value.replace(/[^\d]/g, "");
          return {
            ...option,
            [field]: numericValue + (numericValue ? " €" : ""),
          };
        }
        return { ...option, [field]: value };
      }
      return option;
    });
    setDurationOptions(updatedOptions);
  };

  const handleAddDuration = () => {
    if (
      durationOptions[durationOptions.length - 1].years &&
      durationOptions[durationOptions.length - 1].price.replace(" €", "")
    ) {
      setDurationOptions([...durationOptions, { years: "", price: "" }]);
    }
  };

  const handleRemoveDuration = (index) => {
    if (durationOptions.length > 1) {
      const updatedOptions = durationOptions.filter((_, idx) => idx !== index);
      setDurationOptions(updatedOptions);
    }
  };

  const handleSubmit = async () => {
    const formattedDurations = durationOptions.map((option) => ({
      years: option.years,
      price: option.price.replace(" €", ""),
    }));
    const comp = compatibility.map((device) => device.toUpperCase());

    try {
      const response = await createProduct(
        productName,
        description,
        comp,
        formattedDurations
      );
      if (response.data.serviceDown) {
        setServiceUnavailableMessage(response.data.serviceDown);
        return;
      }
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const isFormValid = () => {
    return (
      productName &&
      description &&
      compatibility.length > 0 &&
      durationOptions.every(
        (option) => option.years && option.price.replace(" €", "")
      )
    );
  };

  if (serviceUnavailableMessage) {
    return (
      <div className="service-unavailable">{serviceUnavailableMessage}</div>
    );
  }

  return (
    <div className="create-products-container">
      <h2>Create Product</h2>
      <section>
        <h3>Basic Information</h3>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <h4>What kind of devices does this product cover?</h4>
        <div className="checkbox-group">
          {["Laptop", "Smartphone", "Tablet"].map((device) => (
            <label key={device} className="device-label">
              {device}
              <input
                type="checkbox"
                checked={compatibility.includes(device)}
                onChange={() => handleCompatibilityChange(device)}
              />
            </label>
          ))}
        </div>
      </section>
      <section>
        <h3>Pricing Details</h3>
        <p>Add price configurations</p>
        {durationOptions.map((option, index) => (
          <div key={index} className="duration-option">
            <div className="inputs-group">
              {" "}
              <input
                type="number"
                value={option.years}
                onChange={(e) =>
                  handleDurationChange(index, "years", e.target.value)
                }
                placeholder="Years"
              />
              <input
                type="text"
                value={option.price}
                onChange={(e) =>
                  handleDurationChange(index, "price", e.target.value)
                }
                placeholder="Price"
              />
            </div>

            {index !== 0 && (
              <div
                className="remove-button-wrapper"
                onClick={() => handleRemoveDuration(index)}
              >
                -
              </div>
            )}
          </div>
        ))}
        <button onClick={handleAddDuration}>+</button>
      </section>
      <button onClick={handleSubmit} disabled={!isFormValid()}>
        Create Product
      </button>
    </div>
  );
};

export default CreateProductsPage;
