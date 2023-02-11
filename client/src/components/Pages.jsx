import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
//import pageModulated from "../pageFunction";
import { changePage } from "../redux/action"; 
import style from "../styles/Pages.module.css";

export default function Pages(arr, pages) {
  const dispatch = useDispatch();
  const pagesDb = useSelector(state => state.pages)
console.log(pagesDb)
  function handlerPage(e) {
    dispatch(changePage(e.target.value));
    //dispatch()
  }
  
    const numbers = Math.ceil(arr.length / pages)
    const numbersPage = [];
    for(let i = 0; i <= numbers; i++) {
      numbersPage.push(i);
    }
  

  return (
    <div>
      <ul>
        {pagesDb.length && numbersPage?.map(n => {
          return (
            <li key={n} >
              <a onClick={() => Pages(n)}>{n}</a>
            </li>
          )
        })}
      <button className={style.prev} value='prev' onClick={handlerPage} >Prev</button>
      <button className={style.next} value='next' onClick={handlerPage} >Next</button>
      </ul>
      
    </div>
  )

}