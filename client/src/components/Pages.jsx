import React from "react";
import { useDispatch, useSelector} from "react-redux";
//import { pageNumbers } from "../pageFunction";
import { changePage } from "../redux/action"; 
import style from "../styles/Pages.module.css";

export default function Pages() {
  const dispatch = useDispatch();
   
  /* const numbers = data.map((e,i) => i)
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = data.slice(indexOfFirstDog, indexOfLastDog);
console.log(currentDogs) */
  //const page = useSelector(state => state.page);
  //const allData = data.map((e,i) => [e, i]) 
  //const allPages = [...allData, pages]
  /* const pageNumber = []
  for (let i = 1; i <= Math.ceil(data / dogsPerPage); i++) {
console.log(i)
    pageNumber.push(i + 1); 
  } */

  function handlerPage(e) {
    dispatch(changePage(e.target.value));
//console.log(e.target.value)
  }

  /* function handlerNum(e) {
    e.preventDefault();
    dispatch(changePage(e.target.value))
  } */

//console.log(pageNumber)
//console.log(allData)

  return (
    <div>
      <button className={style.prev} value='prev' onClick={handlerPage} >Prev</button>
      <button className={style.next} value='next' onClick={handlerPage} >Next</button>
    </div>
  )

}