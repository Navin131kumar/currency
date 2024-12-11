import { useState } from 'react'
import './App.css'
import axios from "axios";
import { useEffect } from 'react';
function App() {
  const[amount, setAmount] = useState(1);
  const[fromcurrency,setfromcurrency]=useState("USD");
  const[tocurrency,settocurrency]=useState("INR");
  const[convertedAmount,setconvertedAmount]=useState(null);

  useEffect(()=>{
    const getExchangeRate= async () =>{
      try{
        let url= 'https://api.exchangerate-api.com/v4/latest/ ${fromCurrency}';
        const response=await axios.get(url);
        console.log(response)
       } catch(error) {
          console.error("error fetching exchange rate:",error);
        }
    };
     }); 
     const handleAmountchange = (e) =>{
      const value=parsefloat(e.target.value);
      setAmount(isNaN(value) ? 0:value);
     }
  return (
    <>
      <div className="currency-converter">
      <div className="box"></div> 
      </div>
      <h1> Currency converter</h1>
      <div className="input container">
       <label htmlFor="amt">Amount</label>
       <input type="number"id="amt" value={amount}/>
       <div className="input container">
        <label htmlFor="from currency:"> Fromcurrency</label>
        <select id="From currency" value={fromcurrency}>
          <option value="Usd">usd-united states dollar</option>
          <option value="Eur">eur-euro</option>
          <option value="Gbp">gbp-british pound strerling</option>
          <option value="Jpy">jpy-japanpese yen</option>
          <option value="Aud">aud-australian dollar</option>
          <option value="Cad">cad-canadian dollar</option>
          <option value="Cny">cny-chinese yuan</option>
          <option value="Inr">inr-Indian rupee</option>
          <option value="Brl">brl-brazilian real</option>
          <option value="Zar">zar-south african rand</option>
        </select>
       </div>
       <div className="input-container">
        <label for="to currency"> To currency:</label>
        <select id= "To currency" value={tocurrency}>
          <option value="Usd">usd-united states dollar</option>
          <option value="Eur">eur-euro</option>
          <option value="Gbp">gbp-british pound sterling</option>
          <option value="Jpy">jpy-japanese yen </option>
          <option value="Aud">aud-austrtalian dollar</option>
          <option value="Cad">cad-canadian dollar</option>
          <option value="Cny">cny-chinese yuan</option>
          <option value="Inr">ivr-indian rupees</option>
          <option value="Brl">brl=brazilian real</option>
          <option value="Zar">zar-south african rand</option>
        </select>
       </div>
        <div className="result">
          <p> 
            {amount}{fromcurrency} is equal to
            {convertedAmount} {tocurrency}
          </p>
        </div>
      </div>
    </>
  )
}
export default App
