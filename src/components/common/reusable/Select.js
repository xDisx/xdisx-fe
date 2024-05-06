// Select.js
import React, { useState } from "react";
import "./Select.scss"; // Assume custom styles are defined here

const Select = ({ options, elementSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    elementSelected(option.value);
  };

  return (
    <div className="select-container">
      <div className="select-display" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "Select an option"}
      </div>
      {isOpen && (
        <ul className="select-options">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
