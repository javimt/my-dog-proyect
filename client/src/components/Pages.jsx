import React from "react";
import { useDispatch, useSelector} from "react-redux";
//import { pageNumbers } from "../pageFunction";
import { changePage } from "../redux/action"; 
import style from "../styles/Pages.module.css";

export default function Pages() {
  const dispatch = useDispatch();
  //const page = useSelector(state => state.page);
  const pages = useSelector(state => state.pages)
console.log()
  /* const numbers = data.map((e,i) => i)
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = data.slice(indexOfFirstDog, indexOfLastDog);
console.log(currentDogs) */
  //const allData = data.map((e,i) => [e, i]) 
  //const allPages = [...allData, pages]
  const allPages = Math.ceil(pages) 
  const pageNumber = []
  //const allPages = parseInt(pageNumber.map(e => e))
  for (let i = 0; i <= Math.ceil(allPages) - 1; i++) {
//console.log(i)
    pageNumber.push(i); 
  }
console.log(pageNumber)

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
        {pageNumber.length && pageNumber.map((i, n) => {
          return (  
            <li key={i} >
              <a className={style.click} onClick={() => handlerNum(i)}>{n}</a>
            </li>
          )})
        } 
        <button className={style.next} value='next' onClick={handlerPage} >Next</button>
      </ul>
    </div>
  )

}