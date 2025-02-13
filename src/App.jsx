import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FlagIcon } from 'react-flag-kit'; // Import the FlagIcon component

function App() {
  let [amount, setAmount] = useState(1);
  const [fromcurrency, setfromcurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  let [exchangerate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const url = 'https://api.exchangerate-api.com/v4/latest/' + fromcurrency;
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[tocurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    getExchangeRate();
  }, [fromcurrency, tocurrency]);

  useEffect(() => {
    if (exchangerate !== null) {
      setConvertedAmount((amount * exchangerate).toFixed(2));
    }
  }, [amount, exchangerate]);

  const handleAmountchange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromcurrencychange = (e) => {
    setfromcurrency(e.target.value);
  };

  const handleTocurrencychange = (e) => {
    setTocurrency(e.target.value);
  };

  return (
    <div className="main-container">
      <h1>Currency Converter</h1>
      <div className="input-container">
        <label htmlFor="amt">Amount</label>
        <input
          type="number"
          id="amt"
          value={amount}
          onChange={handleAmountchange}
        />
      </div>
      
      {/* From Currency Select with Flags */}
      <div className="input-container">
        <label htmlFor="fromcurrency">From Currency</label>
        <select
          id="fromcurrency"
          value={fromcurrency}
          onChange={handleFromcurrencychange}
        >
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR"> EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="BRL">BRL - Brazilian Real</option>
          <option value="ZAR">ZAR - South African Rand</option>
          <option value="PKR">PKR - Pakistani Rupee</option>
          <option value="SAR"> SAR - Saudi Riyal</option>
        </select>
      </div>

      {/* To Currency Select with Flags */}
      <div className="input-container">
        <label htmlFor="tocurrency">To Currency</label>
        <select
          id="tocurrency"
          value={tocurrency}
          onChange={handleTocurrencychange}
        >
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP"> GBP - British Pound </option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="BRL">BRL - Brazilian Real</option>
          <option value="ZAR">ZAR - South African Rand</option>
          <option value="PKR"> PKR - Pakistani Rupee</option>
          <option value="SAR"> SAR - Saudi Riyal </option>
        </select>
      </div>

      <div className="result">
        <p>
          {amount} {fromcurrency} is equal to {convertedAmount} {tocurrency}
        </p>
      </div>
    </div>
  );
}

export default App;
