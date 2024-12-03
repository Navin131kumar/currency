import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="currency-converter">
      <div className="box"></div> 
      </div>
      <h1> currency converter</h1>
      <div className="input container">
       <label htmlFor="amt">amount</label>
       <input type="number"id="amt"/>
       <div className="input container">
        <label htmlFor="from currency:"></label>
        <select id="from currency">
          <option value="usd">usd-united states dollar</option>
          <option value="eur">eur-euro</option>
          <option value="gbp">gbp-british pound strerling</option>
          <option value="jpy">jpy-japanpese yen</option>
          <option value="aud">aud-australian dollar</option>
          <option value="cad">cad-canadian dollar</option>
          <option value="cny">cny-chinese yuan</option>
          <option value="inr">inr-Indian rupee</option>
          <option value="brl">brl-brazilian real</option>
          <option value="zar">zar-south african rand</option>
        </select>
       </div>
       <div className="input-container">
        <label for="tp currency"> To currency:</label>
        <select id= "to currency">
          <option value="usd">usd-united states dollar</option>
          <option value="eur">eur-euro</option>
          <option value="gbp">gbp-british pound sterling</option>
          <option value="jpy">jpy-japanese yen </option>
          <option value="aud">aud-austrtalian dollar</option>
          <option value="cad">cad-canadian dollar</option>
          <option value="cny">cny-chinese yuan</option>
          <option value="inr">ivr-indian rupees</option>
          <option value="brl">brl=brazilian real</option>
          <option value="zar">zar-south african rand</option>
        </select>
       </div>
        <div className="result">
          <p> 1 INR is equal to 83.25 </p>
        </div>
      </div>
    </>
  )
}

export default App
