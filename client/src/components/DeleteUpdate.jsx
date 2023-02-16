import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDog, updateDog, getDogs } from "../redux/action";

export default function DeleteUpdate({id}) {

  const dispatch = useDispatch();
  const data = useSelector(state => state.dogsRender);
console.log("aca esta", id)

  useEffect(() => {
    if(!data.length)dispatch(getDogs());
    //dispatch(getDetail(id));
  },[])

  function handlerDelete() {
    deleteDog(id);
    alert('deleted dog')
    dispatch(getDogs());
  }

   /*function handlerUpdate(e) {
    dispatch(updateDog(e.target.value)) 
  }*/

  return (
    <div>
      <Link to='/home'>
        <button type="button" onClick={handlerDelete} >Delete</button>
      </Link>
      <Link to={`/form/${"?id=" + id}`} >
        <button type="button" >Update</button>
      </Link>
    </div>
  )
}