import { useState } from 'react'
import './App.css'
import axios from "axios";
import { useEffect } from 'react';
function App() {
  const [amount, setAmount] = useState(1);
  const [fromcurrency, setfromcurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = 'https://api.exchangerate-api.com/v4/latest/ ${fromCurrency}';
        const response = await axios.get(url);
        console.log(response)
      } catch (error) {
        console.error("error fetching exchange rate:", error);
      }
    };
  });
  const handleAmountchange = (e) => {
    const value = parsefloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }
  const handleFromcurrencychange = (e) => {
    setfromcurrency(e.target.value);
  }
  const handleTocurrencychange = (e) => {
    setTocurrency(e.target.value);
  }
  return (
    <>
      <div className='main-container'>
      <h1> Currency converter</h1>
      <div className="input container">
        <label htmlFor="amt">Amount</label>
        <input type="number" id="amt" value={amount} onChange={handleAmountchange} />
        <div className="input container">
          <label htmlFor="fromcurrency:"> From currency</label>
          <select id="fromcurrency" value={fromcurrency} onChange={handleFromcurrencychange}>
            <option value="USD">USD-United States Dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British Pound Strerling</option>
            <option value="JPY">JPY-Japanpese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinese Yuan</option>
            <option value="INR">INR-Indian Rupee</option>
            <option value="BRL">BRL-Brazilian Real</option>
            <option value="ZAR">ZAR-South African Rand</option>
            <option value="PAK">PAK-Pakistani Rupee</option>
            <option value="SAR">SAR-Saudi Arabian Riyal</option>
          </select>
        </div>
        <div className="input-container">
          <label for="tocurrency"> To currency:</label>
          <select id="tocurrency" value={tocurrency} onChange={handleTocurrencychange}>
            <option value="USD">USD-United States Dollar</option>
            <option value="EUR">Eur-Euro</option>
            <option value="GBP">GBP-British Pound Sterling</option>
            <option value="JPY">JPY-Japanese Yen </option>
            <option value="AUD">AUD-Austrtalian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinese Yuan</option>
            <option value="INR">INR-Indian Rupees</option>
            <option value="BRL">BRL=Brazilian Real</option>
            <option value="ZAR">ZAR-South African Rand</option>
            <option value="PAK">PAK-Pakistani Rupee</option>
            <option value="SAR">SAR-Saudi Arabian Riyal</option>
          </select>
        </div>
        <div className="result">
          <p>
            {amount}{fromcurrency} is equal to
            {convertedAmount} {tocurrency}
          </p>
        </div>
      </div>

      </div>
    </>
  )
}
export default App
