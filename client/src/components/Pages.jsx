import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import pageModulated from "../pageFunction";
import { changePage } from "../redux/action"; 
import style from "../styles/Pages.module.css";

export default function Pages(arr, pages) {
  const dispatch = useDispatch();
  const pagesDb = useSelector(state => state.pages)
console.log(pagesDb)

  //const numbers = Math.ceil(arr.length / pages)
  const numbersPage = [];
  for(let i = 0; i <= Math.ceil(arr.length / pages); i++) {
    numbersPage.push(i);
  }
  //console.log(numbersPage)

  function handlerPage(e) {
    dispatch(changePage(e.target.value));
console.log(e.target.value)
  }
   
  return (
    <div>
      <ul>
        {pagesDb.length && numbersPage?.map(n => {
  console.log(numbersPage)
          return (
            <li key={n} >
              <a onClick={() => handlerPage(n)}>{n}</a>
            </li>
          )
        })}
      <button className={style.prev} value='prev' onClick={handlerPage} >Prev</button>
      <button className={style.next} value='next' onClick={handlerPage} >Next</button>
      </ul>
      
    </div>
  )

}