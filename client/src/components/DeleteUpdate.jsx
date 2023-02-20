import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDog, getDogs } from "../redux/action";
import style from '../styles/DeleteUpdate.module.css'

export default function DeleteUpdate({id}) {

  const dispatch = useDispatch();
  const data = useSelector(state => state.dogsRender);
console.log("aca esta", id)

  useEffect(() => {
    if(!data.length)dispatch(getDogs());
  },[data,dispatch])

  function handlerDelete() {
    deleteDog(id);
    alert('deleted dog')
    dispatch(getDogs());
  }


  return (
    <div>
      <Link to='/home'>
        <button className={style.delete} type="button" onClick={handlerDelete} >Delete</button>
      </Link>
      <Link to={`/form/${"?id=" + id}`} >
        <button className={style.update} type="button" >Update</button>
      </Link>
    </div>
  )
}