import React, { useState, useEffect } from "react";
import style from '../styles/Form.module.css';
import { useSelector, useDispatch } from 'react-redux';


export default function Form() {
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.allDogs);
  const tempers = useSelector(state => state.tempers);
  
  const [input, setInput] = useState({
    name: "",
    image: "",
    weight: [],
    height: [],
    life_span: "",
    temperament: []
  })

  return (
    <div>
      <div>
        <form action="">
          <div></div>
          <div></div>
          <div></div>
        </form>
      </div>
    </div>
  )
}