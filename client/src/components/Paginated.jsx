/* import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../redux/action";
import { getDogs } from "../redux/action";
//import Pages from "./Pages";

export default function Paginated() {
  const dispatch = useDispatch();

  const data = useSelector(state => state.allDogs);

  const [currentPage, setCurrentPage] = useState(1); 
  const [dogsPerPage, setDogsPerPage] = useState(8); 
  const indexOfLastDog = currentPage * dogsPerPage; 
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  const currentDogs = data.slice(indexOfFirstDog, indexOfLastDog);  */
//console.log(data.slice(indexOfFirstDog, indexOfLastDog))

  /* useEffect(() => {
    dispatch(changePage())
    dispatch(getDogs())
  },[]) */

  /* const pageNumber = []
  for (let i = 0; i <= Math.ceil(data / dogsPerPage); i++) {
    pageNumber.push(i + 1); 
//console.log(i)
  } */

  /* function handlerPage(e) {
    e.preventDefault()
    setCurrentPage()
    dispatch(changePage(e.target.value))
//console.log(e.target.value)
  } 

  return (
    <nav>
      <ul>
        {currentDogs && pageNumber.map((n) => {
          return (  
            <li key={n} >
              <a onClick={handlerPage}>{n}</a>
            </li>
          )})
        } 
      </ul>
    </nav>
  ) 
} 
*/
 
