import React, { useState } from "react";
import axios from "axios";

function ApiIntegrator() {
  const [numberContract, setNumberContract] = useState("");
  const [resultContract, setResultContract] = useState(null);
  const [numberCustomer, setNumberCustomer] = useState("");
  const [resultCustomer, setResultCustomer] = useState(null);

  const handleContractSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:1242/xdisx/salut";
    if (numberContract) {
      try {
        const response = await axios.get(url, {
          params: { numar: numberContract },
        });
        setResultContract(response.data);
      } catch (error) {
        console.error("Error with Contract Service:", error);
        setResultContract("Error fetching data");
      }
    }
  };

  const handleCustomerSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:1239/xdisx/salut";
    if (numberCustomer) {
      try {
        const response = await axios.get(url, {
          params: { numar: numberCustomer },
        });
        setResultCustomer(response.data);
      } catch (error) {
        console.error("Error with Customer Service:", error);
        setResultCustomer("Error fetching data");
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Contract Service</h1>
        <form onSubmit={handleContractSubmit}>
          <input
            type="text"
            value={numberContract}
            onChange={(e) => setNumberContract(e.target.value)}
            placeholder="Enter a number"
          />
          <button type="submit">Double Number</button>
        </form>
        {resultContract !== null && <h2>Result: {resultContract}</h2>}
      </div>

      <div>
        <h1>Customer Service</h1>
        <form onSubmit={handleCustomerSubmit}>
          <input
            type="text"
            value={numberCustomer}
            onChange={(e) => setNumberCustomer(e.target.value)}
            placeholder="Enter a number"
          />
          <button type="submit">Double Number</button>
        </form>
        {resultCustomer !== null && <h2>Result: {resultCustomer}</h2>}
      </div>
    </div>
  );
}

export default ApiIntegrator;
