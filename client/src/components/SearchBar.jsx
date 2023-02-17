import React from "react";
import style from '../styles/SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { getDogsByName } from "../redux/action";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [search, setSearch] = useState(false);

  function handlerName(e) {
    e.preventDefault();
    setName(e.target.value); 
  }
//console.log()
  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByName(name));
    setSearch(true);
    setName("")
    
  }

  return (
    <div className={style.bar}>
      <input value={name} type="text" placeholder="Write your breed" onChange={handlerName}/>
      <button type="submit" onClick={handlerSubmit} > Search </button>
    </div>
  );
}