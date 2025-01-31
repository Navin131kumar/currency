import { useState } from 'react'
import './App.css'
import axios from "axios";
import { useEffect } from 'react';
function App() {
  let [amount, setAmount] = useState(1);
  const [fromcurrency, setfromcurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  let [exchangerate,setExchangeRate]=useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const url = 'https://api.exchangerate-api.com/v4/latest/' +fromcurrency;
        const response = await axios.get(url);
        //console.log(response);
        setExchangeRate(response.data.rates[tocurrency])
      } catch (error) {
        console.error("error fetching exchange rate:", error);
      }
    };
    getExchangeRate();
  },[fromcurrency,tocurrency]);
  useEffect(() => {
    if(exchangerate !== null){
      setConvertedAmount((amount=exchangerate).toFixed(2))
    }
  },[amount,exchangerate])
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
            <option value="PKR">PKR-Pakistani Rupee</option>
            <option value="SAR">SAR-Saudi Arabian Riyal</option>
            <option value="BDT">BDT-Bangladeshi Taka</option>
            <option value="IRR">IRR-Iranian Real</option>
            <option value="LKR">LKR-Sri lanka Rupee</option>
            <option value="MYR">MYR-Malayian Ringgit</option>
            <option value="IQD">IQD-Iraqi Dinnar</option>
            <option value="NZD">NZD-New Zealand Dollar</option>
            <option value="MXN">MXN-Mexican Peso</option>
            <option value="MMK">MMK-Myanmar Kyat</option>
            <option value="PGK">PGK-Papua New Guinea Kina</option>
            <option value="KWD">KWD-Kuwaiti Dinnar</option>
            <option value="SGD">SGD-Singapore Dollar</option>
            <option value="THB">THB-Thai Bhatt</option>
            <option value="UZS">UZS-Uzbekistani Som</option>
            <option value="RUB">RUB-Russian Rouble</option>
            <option value="AFN">AFN-Afghan Afgani</option>
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
            <option value="PKR">PKR-Pakistani Rupee</option>
            <option value="SAR">SAR-Saudi Arabian Riyal</option>
            <option value="BDT">BDT-Bangladeshi Taka</option>
            <option value="IRR">IRR-Iranian Real</option>
            <option value="LKR">LkR-Sri Lanka Rupee</option>
            <option value="MYR">MYR-Malasyian Ringgit</option>
            <option value="IQD">IQD-iraqi Dinnar</option>
            <option value="NZD">NZD-New Zealand Dollar</option>
            <option value="MXN">Mexican Peso</option>
            <option value="MMK">MMK-Myanmar</option>
            <option value="PGK">Papua New Guinea Kina</option>
            <option value="KWD">KWD-Kuwaiti Dinnar</option>
            <option value="SGD">SGD-Singapore Dollar</option>
            <option value="THB">THB-Thai Bhatt</option>
            <option value="UZS">UZS-Uzbekistani Som</option>
            <option value="RUB">RUB-Russian Rouble</option>
            <option value="AFN">AFN-Afghan Afghani</option>
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
