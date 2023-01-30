import React from "react";
import style from '../styles/SearchBar.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { /* getDogs, */ getDogsByName } from "../redux/action";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [search, setSearch] = useState(false);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if(name) {
      e.preventDefault();
      dispatch(getDogsByName(name));
      setSearch(true);
      setName("")
    } else {
      e.preventDefault();
      setSearch(false)
    }
  }

  return (
    <div className={style.search}>
      <Link to='/home'>
        <button type="submit" > Back to Home </button>
      </Link>
      <input className={style.input} value={name} type="text" placeholder="Write your breed" onChange={handleName}/>
      <button className={style.button} type="submit" onClick={handleSubmit} > Search </button>
    </div>
  );
}