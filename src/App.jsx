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
        <label htmlFor="from currency:"> From currency</label>
        <select id="From currency" value={fromcurrency}>
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
        </select>
       </div>
       <div className="input-container">
        <label for="to currency"> To currency:</label>
        <select id= "To currency" value={tocurrency}>
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
