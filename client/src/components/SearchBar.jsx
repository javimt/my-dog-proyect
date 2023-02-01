import React from "react";
import style from '../styles/SearchBar.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { getDogs, getDogsByName } from "../redux/action";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [search, setSearch] = useState(false);

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    // e.preventDefault();
    // dispatch(getDogsByName(name));
    //if(name) {
      e.preventDefault();
      dispatch(getDogsByName(name));
      setSearch(true);
      setName("")
    //} else {
      // e.preventDefault();
      // setSearch(false)
      // setName("")
    //}
  }
  
  function handleReset(e) {
    e.preventDefault();
    dispatch(getDogs())
  }

  return (
    <div className={style.bar}>
      <div>
        <button className={style.home} onClick={handleReset} type="submit">Home</button>
      </div>
      <input /* className={style.input} */ value={name} type="text" placeholder="Write your breed" onChange={handleName}/>
      <button /*className={style.button}*/ type="submit" onClick={handleSubmit} > Search </button>
    </div>
  );
}