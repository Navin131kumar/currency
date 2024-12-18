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
            <option value="USD">Usd-United States Dollar</option>
            <option value="EUR">Eur-Euro</option>
            <option value="GBP">Gbp-British pound strerling</option>
            <option value="JPY">Jpy-Japanpese yen</option>
            <option value="AUD">Aud-Australian dollar</option>
            <option value="CAD">Cad-Canadian dollar</option>
            <option value="CNY">Cny-Chinese yuan</option>
            <option value="INR">Inr-Indian rupee</option>
            <option value="BRL">Brl-Brazilian real</option>
            <option value="ZAR">Zar-South african rand</option>
            <option value="PAK">Pak-Pakistani rupee</option>
            <option value="SAR">Sar-Saudi Arabian Riyal</option>
          </select>
        </div>
        <div className="input-container">
          <label for="tocurrency"> To currency:</label>
          <select id="tocurrency" value={tocurrency} onChange={handleTocurrencychange}>
            <option value="USD">Usd-United states dollar</option>
            <option value="EUR">Eur-Euro</option>
            <option value="GBP">Gbp-British pound sterling</option>
            <option value="JPY">Jpy-Japanese yen </option>
            <option value="AUD">Aud-Austrtalian dollar</option>
            <option value="CAD">Cad-Canadian dollar</option>
            <option value="CNY">Cny-Chinese yuan</option>
            <option value="INR">Inr-Indian rupees</option>
            <option value="BRL">Brl=Brazilian real</option>
            <option value="ZAR">Zar-South african rand</option>
            <option value="PAK">Pak-Pakistani rupee</option>
            <option value="SAR">Sar-Saudi Arabian Riyal</option>
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
