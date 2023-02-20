import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { changePage } from "../redux/action"; 
import style from "../styles/Pages.module.css";

export default function Pages() {
  const dispatch = useDispatch();
  const pages = useSelector(state => state.pages)
console.log()

  const [pageNumber, setPageNumber] = useState([])

  useEffect(()=> {
//console.log(pages)
    const aux = []
    for (let i = 0; i < pages; i++) {
      aux.push(i); 
    }
    setPageNumber(aux)
  },[pages])

//console.log(pageNumber)

  const handlerPage = (e) => {
    dispatch(changePage(e.target.value));
//console.log(e.target.value)
  }

  function handlerNum(num) {
    dispatch(changePage(num))
  }
 
  return (
    <div >
      <ul className={style.container}>
        <button className={style.prev} value='prev' onClick={handlerPage} >Prev</button>
        {pageNumber.map((i, n) => {
          return (  
            <li key={i} >
              <p className={style.click} onClick={() => handlerNum(i)}>{n + 1}</p>
            </li>
          )})
        } 
        <button className={style.next} value='next' onClick={handlerPage} >Next</button>
      </ul>
    </div>
  )

}