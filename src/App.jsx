import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  let [amount, setAmount] = useState(0);
  const [fromcurrency, setFromCurrency] = useState("USD");
  const [tocurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  let [exchangerate, setExchangeRate] = useState(null);
  const [userCountry, setUserCountry] = useState('');

  useEffect(() => {
    // Function to get user's location and country
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const geoUrl = `https://geocode.xyz/${latitude},${longitude}?geoit=json`;
            const response = await axios.get(geoUrl);
            setUserCountry(response.data.country);
            // Update the currency based on the country (simplified logic)
            if (response.data.country === 'India') {
              setToCurrency('INR');
            } else if (response.data.country === 'United States') {
              setToCurrency('USD');
            } else {
              setToCurrency('EUR'); // default for other countries
            }
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

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

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
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
          onChange={handleAmountChange}
        />
      </div>

      <div className="input-container">
        <label htmlFor="fromcurrency">From Currency</label>
        <select
          id="fromcurrency"
          value={fromcurrency}
          onChange={handleFromCurrencyChange}
        >
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR"> EUR - Euro</option>
          <option value="GBP">GBP-British Pound</option>
          <option value="INR">INR-Indian Rupee</option>
          <option value="JPY">JPY-Japanese Yen</option>
          <option value="AUD">AUD-Australian Dollar</option>
          <option value="CAD">CAD-Canadian Dollar</option>
          <option value="CNY">CNY-Chinese Yuan</option>
          <option value="BRL">BRL-Brazilian Real</option>
          <option value="ZAR">ZAR-South African Rand</option>
          <option value="PKR">PKR-Pakistani Rupee</option>
          <option value="SAR">SAR-Saudi Riyal</option>
          <option value="AFN">AFN-Afghan Afghani</option>
          <option value="SGD">SGD-Singapore Dollar</option>
          <option value="UZS">UZS-Uzbekistan Som</option>
          <option value="KWD">KWD-Kuwaiti Dinnar</option>
          <option value="BDT">BDT-Bangladeshi Taka</option>
          <option value="EGP">EGP-Egyptian Pound</option>
          <option value="LKR">LKR-Sri Lankan Rupee</option>
          <option value="RUB">RUB-Russian Rouble</option>
        </select>
      </div>

      <div className="input-container">
        <label htmlFor="tocurrency">To Currency</label>
        <select
          id="tocurrency"
          value={tocurrency}
          onChange={handleToCurrencyChange}
        >
          <option value="USD">USD-United States Dollar</option>
          <option value="EUR">EUR-Euro</option>
          <option value="GBP">GBP-British Pound</option>
          <option value="INR">INR-Indian Rupee</option>
          <option value="JPY">JPY-Japanese Yen</option>
          <option value="AUD">AUD-Australian Dollar</option>
          <option value="CAD">CAD-Canadian Dollar</option>
          <option value="CNY">CNY-Chinese Yuan</option>
          <option value="BRL">BRL-Brazilian Real</option>
          <option value="ZAR">ZAR-South African Rand</option>
          <option value="PKR">PKR-Pakistani Rupee</option>
          <option value="SAR">SAR-Saudi Riyal</option>
          <option value="AFN">AFN-Afghan Afghani</option>
          <option value="SGD">SGD-Singapore Dollar</option>
          <option value="UZS">UZS-Uzbekistan Som</option>
          <option value="KWD">KWD-Kuwaiti Dnnar</option>
          <option value="BDT">BDT-Bangladeshi Taka</option>
          <option value="EGP">EGP-Egyptian pound</option>
          <option value="LKR">LKR-Sri Lankan Rupee</option>
          <option value="RUB">RUB-Russian Rouble</option>
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
