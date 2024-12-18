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
            <option value="Usd">Usd-United states dollar</option>
            <option value="Eur">Eur-Euro</option>
            <option value="Gbp">Gbp-British pound strerling</option>
            <option value="Jpy">Jpy-Japanpese yen</option>
            <option value="Aud">Aud-Australian dollar</option>
            <option value="Cad">Cad-Canadian dollar</option>
            <option value="Cny">Cny-Chinese yuan</option>
            <option value="Inr">Inr-Indian rupee</option>
            <option value="Brl">Brl-Brazilian real</option>
            <option value="Zar">Zar-South african rand</option>
            <option value="Pak">Pak-Pakistani rupee</option>
            <option value="Sar">Sar-Saudi Arabian Riyal</option>
          </select>
        </div>
        <div className="input-container">
          <label for="tocurrency"> To currency:</label>
          <select id="tocurrency" value={tocurrency} onChange={handleTocurrencychange}>
            <option value="Usd">Usd-United states dollar</option>
            <option value="Eur">Eur-Euro</option>
            <option value="Gbp">Gbp-British pound sterling</option>
            <option value="Jpy">Jpy-Japanese yen </option>
            <option value="Aud">Aud-Austrtalian dollar</option>
            <option value="Cad">Cad-Canadian dollar</option>
            <option value="Cny">Cny-Chinese yuan</option>
            <option value="Inr">Inr-Indian rupees</option>
            <option value="Brl">Brl=Brazilian real</option>
            <option value="Zar">Zar-South african rand</option>
            <option value="Pak">Pak-Pakistani rupee</option>
            <option value="Sar">Sar-Saudi Arabian Riyal</option>
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
