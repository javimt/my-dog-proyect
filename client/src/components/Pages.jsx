import { useDispatch, useSelector } from "react-redux";
//import pageModulated from "../pageFunction";
import { changePage } from "../redux/action"; 
import style from "../styles/Pages.module.css";

export default function Pages() {
  const dispatch = useDispatch();
  //const filterDog = useSelector((state) => state.dogsRender);
  //const numbers = pageModulated();

  function handlerPage(e) {
    dispatch(changePage(e.target.value));
    //dispatch()
  }

  return (
    <div>
      <button className={style.prev} value='prev' onClick={handlerPage} >Prev</button>
      <button className={style.next} value='next' onClick={handlerPage} >Next</button>
    </div>
  )

}