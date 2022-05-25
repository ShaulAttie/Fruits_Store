import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from './Components/Comp';
import CheckCountry from "./Components/CheckCountry"
import NewSearchBar from "./Components/NewSearchBar"
import RangeBar from "./Components/RangeBar"
import Sum from "./Components/Sum"
import './App.css';
import CunrrencyButton from './Components/CurrencyButton';

let list = [
  { product: 'Grapes', country: "Israel", vitamin: 'B, K', id: 'lg01', url: 'https://img.rami-levy.co.il/product/147/6344/medium.jpg', price: 9.90 },
  { product: 'Peaches', country: "Spain", vitamin: 'A, C, K', id: 'lp02', url: 'https://img.rami-levy.co.il/product/183/8722/medium.jpg', price: 14.90 },
  { product: 'Peppers', country: "India", vitamin: 'A, C', id: 'lp03', url: 'https://img.rami-levy.co.il/product/132/33/medium.jpg', price: 2.90 },
  { product: 'Onions', country: "Thayland", vitamin: 'E, C', id: 'lo04', url: 'https://img.rami-levy.co.il/product/612/13924/medium.jpg', price: 4.90 },
  { product: 'Banana', country: "Israel", vitamin: 'A, B, K', id: 'lb05', url: 'https://img.rami-levy.co.il/product/134/35/medium.jpg', price: 12.90 }
]

/////////////Geting the array below from list
// let country = ["Israel", "Spain", "India", "Thayland"]
let country = []
list.map(item => !country.includes(item.country) ? country.push(item.country) : null)

/////////////Geting the array below from list
// let vitamins = ["A", "B", "C", "E", "K"]
let vitamins = []
vitamins = list.map(item => item.vitamin).reduce((a, b) => a + b + ',', '').split(",").map(item => item.trim())
vitamins = [...new Set(vitamins)].sort()
vitamins.shift()

const currency = ['ILS', 'USD', 'BZL']

var objCheck = []
let min = []
var sum = 0
// var currencyCheck = 'USD'

//////////////////////////////////////////////////////////////
// list.map(v => min.push(parseFloat(v.price)))
// console.table(min)
// console.log(Math.ceil(Math.max(...min)))    // MAX PRICE
// console.log(Math.floor(Math.min(...min)))   // MIN PRICE
// console.log(Math.round(min.reduce((a,b) => a + b, 0) / min.length))   //AVG PRICE
/////////////////////////////////////////////////////////////

function App() {

  const [mlayState, setMlayState] = useState(list)

  /////////////////////////////////////////////////////////////////////////////// Product Delete Button
  function deleteButton(e) {
    setMlayState(mlayState.filter(v => v.id !== e))
  }

  /////////////////////////////////////////////////////////////////////////////// Search Bar
  // Showing only products from SearchBar

  const [searchValue, setSearchValue] = useState("")

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    checkboxCheck(e.target.validity.valid, e.target, e.target.value)
  }

  ///////////////////////////////////////////////////////////////////////////// Range Values
  list.map(v => min.push(parseFloat(v.price)))
  let maxPrice = Math.ceil(Math.max(...min))   // MAX PRICE
  let minPrice = Math.floor(Math.min(...min))   // MIN PRICE

  ////////////////////////////////////////////////////////////////////////////// Range Bar
  const [ranValue, setRanValue] = useState(maxPrice)

  const changeRange = (e) => {
    setRanValue(e.target.value)
    checkboxCheck(e.target.validity.valid, e.target, e.target.value)
  }

  /////////////////////////////////////////////////////////////// checkboxCheck for filter Function
  function checkboxCheck(check, elem, value) {
    let newObjCheck = { className: elem, checked: check, value: value }
    console.log(newObjCheck);
    objCheck.map(e => e.className == newObjCheck.className ?
      (e.checked = newObjCheck.checked) && (e.value = newObjCheck.value) : null)

    if (objCheck.find(e => e.className == newObjCheck.className) == undefined) {
      objCheck.push(newObjCheck)
    }
    if (check == false) {
      let result = objCheck.filter(v => v.checked == true)
      objCheck = result
    }

    filterAll(objCheck)
  }

  /////////////////////////////////////////////////////////////////////////////// list Filter
  function filterAll(objCheck) {
    console.table(objCheck)

    let newList = [...list]

    for (let item of objCheck) {
      newList = newList.filter(v => v.country == item.value
        || v.vitamin.includes(item.value)
        || v.price < Number(item.value)
        || v.product.toLowerCase().includes(item.value.toLowerCase()))
    }

    setMlayState(newList)
  }

  /////////////////////////////////////// "Function" sum thats show the sum of products lest on screem
  sum = 0
  mlayState.map(v => sum += v.price)
  sum = sum.toFixed(2)

  ///////////////////////////////////////
  const [theCurrency, setTheCurrency] = useState('USD')

  const currencyHandler = (e) => {
    console.log(e.target.value);
    setTheCurrency(e.target.value)

  }

  return (
    <>
      <h1 id='storeName'>My Store</h1>
      <div id='sum_currency'>
        <div id="sum">
          <Sum sum={sum} />
        </div>
        <div id="currency">
          {currency.map(elem => {
            return (
              <CunrrencyButton currency={elem} onClick={currencyHandler} key={elem} />
            )
          })}
        </div>
      </div>
      {/* ///////////////////////////////////////////SEARCH BAR */}
      <div className='header'>
        <div>
          <input type="text" value={searchValue} onChange={(e) => handleInputChange(e)} className="inputSearch" />
          <ul>
            {mlayState.map((elem) => {
              return (
                <NewSearchBar key={elem.id}>
                  {elem.product}
                </NewSearchBar>
              )
            })}
          </ul>
        </div>

        {/* ////////////////////////////////RANGE BAR */}
        <RangeBar maxP={maxPrice} minP={minPrice} avgP={Number(ranValue)} nVal={Number(ranValue)} >
          <label>Price?</label><br />
          <span> {minPrice}</span><input type="range" min={minPrice} max={maxPrice} step="1" value={Number(ranValue)} onInput={(e) => changeRange(e)} />
          <span> {maxPrice}</span><br />
          <span>{Number(ranValue)}</span><br />
        </RangeBar>

        {/* ////////////////////////////////COUNTRY CHECKBOX */}
        <div>
          {country.map((elem) => {
            return (
              <CheckCountry key={elem}>
                <div >
                  <input type="checkbox" id="myCheck" className={elem} onChange={(e) => checkboxCheck(e.target.checked, e.target, elem)} />
                  <label>{elem}</label><br />
                </div>
              </CheckCountry >)
          })}
        </div>

        {/* ////////////////////////////////VITAMINS CHECKBOX */}
        <div>
          {vitamins.map((elem) => {
            return (
              <CheckCountry key={elem}>
                <div >
                  <input type="checkbox" id="myCheck1" onChange={(e) => checkboxCheck(e.target.checked, e.target, elem)} className={elem} />
                  <label>{elem}</label><br />
                </div>
              </CheckCountry >)
          })}
        </div>
      </div>

      {/* //////////////////////////////////////CARDS */}
      <div className="items">
        {mlayState.map((elem) => {
          return (
            <Card key={elem.id} >
              <CardHeader>
                <img src={elem.url} alt={elem.product} />
              </CardHeader>
              {theCurrency == 'ILS' ?
                <CardContent><h4><b>{elem.product}<br /> ILS {(elem.price * 3.5).toFixed(2)}  </b></h4> </CardContent> :
                theCurrency == 'USD' ?
                  <CardContent><h4><b>{elem.product}<br /> $ {elem.price}</b></h4> </CardContent> :
                  theCurrency == 'BZL' ?
                    <CardContent><h4><b>{elem.product}<br /> BZL {(elem.price * 5.6).toFixed(2)}</b></h4> </CardContent> : null
              }
              <CardFooter>
                <button className="removeButton" id={elem.id} onClick={(e) => deleteButton(e.target.id)}>Remove</button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  );
}

export default App;
