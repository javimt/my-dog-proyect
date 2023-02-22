import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { changePage } from "../redux/action"; 
import style from "../styles/Pages.module.css";

export default function Pages() {
  const dispatch = useDispatch();
  const pages = useSelector(state => state.pages)
  const page = useSelector(state => state.page)
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
    const target = e.target.value
    dispatch(changePage(target));
    Array.from(e.target.parentNode.children).slice(1,-1).forEach(e => e.firstChild.className = style.click)
    Array.from(e.target.parentNode.children).slice(1,-1)[target === "next" ? page === pages - 1 ? page : page + 1 : page === 0 ? page : page - 1].firstChild.className = style.clickVisited
console.log()
  }

  function handlerNum(num, e) {
    dispatch(changePage(num))
    Array.from(e.target.parentNode.parentNode.children).slice(1, -1).forEach(e => e.firstChild.className = style.click)
    e.target.className = style.clickVisited
//console.log();
  }

  return (
    <div >
      <ul className={style.container}>
        <button className={style.prev} value='prev' onClick={(e) => handlerPage(e)} >Prev</button>
        {pageNumber.map((i, n) => {
          return (  
            <li key={i} >
              <p className={i === 0 ? style.clickVisited : style.click} onClick={(e) => handlerNum(i,e)}>{n + 1}</p>
            </li>
          )})
        } 
        <button className={style.next} value='next' onClick={handlerPage} >Next</button>
      </ul>
    </div>
  )

}