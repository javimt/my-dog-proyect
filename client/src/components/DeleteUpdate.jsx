import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteDog, getDetail, updateDog, getDogs } from "../redux/action";

export default function DeleteUpdate() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail);
  const data = useSelector(state => state.dogsRender);
console.log(detail)

  useEffect(() => {
    if(!data.length)dispatch(getDogs(id));
    //dispatch(getDetail(id));
  },[])

  function handlerDelete(e) {
    dispatch(deleteDog(e.target.value))
  }

  function handlerUpdate(e) {
    dispatch(updateDog(e.target.value))
  }

  return (
    <div>
      <button type="submit" onClick={() => handlerDelete(id)} >Delete</button>
      <button type="submit" onClick={() => handlerUpdate(id)} >Update</button>
    </div>
  )
}