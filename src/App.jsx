import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Currency Converter States
  let [amount, setAmount] = useState(0);
  const [fromcurrency, setFromCurrency] = useState("USD");
  const [tocurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  let [exchangerate, setExchangeRate] = useState(null);
  const [userCountry, setUserCountry] = useState('');

  // Chatbot States
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Geolocation to fetch user country and set default currency
  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const geoUrl = `https://geocode.xyz/${latitude},${longitude}?geoit=json`;
            const response = await axios.get(geoUrl);
            setUserCountry(response.data.country);
            if (response.data.country === 'India') {
              setToCurrency('INR');
            } else if (response.data.country === 'United States') {
              setToCurrency('USD');
            } else {
              // Handle other countries here
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

  // Fetch exchange rates
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

  // Update converted amount when amount or exchange rate changes
  useEffect(() => {
    if (exchangerate !== null) {
      setConvertedAmount((amount * exchangerate).toFixed(2));
    }
  }, [amount, exchangerate]);

  // Handle user input for amount change
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  // Handle currency selection changes
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  // Send message to chatbot API and get response
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Send user's message to Dialogflow
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await axios.post(
        'https://api.dialogflow.com/v1/query?v=20150910',
        {
          query: input,
          lang: 'en',
          sessionId: '12345', // You can generate unique session IDs
        },
        {
          headers: {
            Authorization: `Bearer YOUR_DIALOGFLOW_ACCESS_TOKEN`,
          },
        }
      );

      const botMessage = {
        sender: 'assistant',
        text: response.data.result.fulfillment.speech,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
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
        <option value="MXN">MXN-Mexican Peso</option>
        <option value="RUB">RUB-Russian Ruble</option>
        <option value="SGD">SGD-Singapore Dollar</option>
        <option value="CHF">CHF-Swiss Franc</option>
        <option value="TRY">TRY-Turkish Lira</option>
        <option value="KRW">KRW-South Korean Won</option>
        <option value="SEK">SEK-Swedish Krona</option>
        <option value="NOK">NOK-Norwegian Krone-</option>
        <option value="NZD">NZD-New Zealand Dollar</option>
        <option value="AED">AED-UAE Dirham</option>
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
        <option value="MXN">MXN-Mexican Peso</option>
        <option value="RUB">RUB-Russian Ruble</option>
        <option value="SGD">SGD-Singapore Dollar</option>
        <option value="CHF">CHF-Swiss France</option>
        <option value="TRY">TRY-Turkish Lira</option>
        <option value="KRW">KRW-South Korean Won</option>
        <option value="SEK">SEK-Swedish Krona</option>
        <option value="NOK">NOK-Norwegian Krone</option>
        <option value="NZD">NZD-New Zealand Dollar</option>
        <option value="AED">AED-UAE Dirham</option>
          
        </select>
      </div>

      <div className="result">
        <p>
          {amount} {fromcurrency} is equal to {convertedAmount} {tocurrency}
        </p>
      </div>

      {/* Chatbot UI */}
      <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      
    </div>
    </div>
  );
}

export default App;
