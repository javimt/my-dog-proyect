import React, { useState, useEffect } from "react";
import style from '../styles/Form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTemperaments, createDogs } from "../redux/action";


export default function Form() {

  // Un formulario controlado con JavaScript con los siguientes campos:
  // Nombre
  // Altura (Diferenciar entre altura mínima y máxima)
  // Peso (Diferenciar entre peso mínimo y máximo) 
  // Años de vida
  // Posibilidad de seleccionar/agregar uno o más temperamentos
  // Botón/Opción para crear una nueva raza de perro

  const dispatch = useDispatch();
  const dogs = useSelector(state => state.allDogs);
  const tempers = useSelector(state => state.tempers);
  const [button, setButton] = useState(true)
//console.log(tempers)

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    weight: [],
    height: [],
    life_span: "",
  });

  const [input, setInput] = useState({
    name: "",
    image: "",
    weight: [],
    height: [],
    life_span: "",
    temperament: []
  })
//console.log(dogs) 

  useEffect(() => {
    if(input.name.length > 0 && input.height.length > 0 && input.weight.length > 0)setButton(false);
    else setButton(true)
  },[input, setButton]);

  useEffect(() => {
    dispatch(getTemperaments())
  },[])


//============================>> HANDLERS <<==============================\\

  function handlerChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    )
  }

  function handlerSubmit(e) {
    e.preventDefault();
    if(!errors.name && !errors.image && input.temperament.length > 0) {
      dispatch(createDogs(input));
      alert("dog created!");
      setInput("")
    } else {
      if(input.temperament.length <= 0) {
        alert("Temperament are missing");
      } else {
        alert("Imcomplete required fields!")
      }
    }
  }

  function handlerSelect(e) {
    const value = e.target.value;
console.log(value);
    setInput({
      ...input,
      temperament:
      ! input.temperament.includes(value) && value !== 'Select'
      ? [...input.temperament, value]
      : [...input.temperament]
    })
  }

  function handleError(e) {
    e.preventDefault();
    alert("Complete the form!");
  }

//============================>> END HANDLERS <<==============================\\


//============================>> VALIDATIONS <<==============================\\

const validate = (input) => {
  const errors = {};

  //=======>> NAME <<======\\
  if(!input.name) {
    errors.name = "You must enter a breed name";
  } else if(!/^[a-zA-Z]+$/.test(input.name)) {
    errors.name = "Invalid name. The name must contain letters";
  } else if(input.name.length < 2 || input.name.length > 20) {
    errors.name = "At least 2 letters, less than 20";
  } else if(dogs.includes(input.name)) {
    errors.name = "The dog already exists, use another name";
  };
  //=======>> END NAME <<======\\

  //=======>> HEIGHT <<======\\
  if(!input.height.length < 2) {
    errors.height = "You must enter a minimum and maximum height";
  } else if(!/^[0-9]+$/.test(input.height)) {
    errors.height = "Can only contain numbers"
  }
  //=======>> END HEIGHT <<======\\
  
  if(!input.weight.length < 2) {
    errors.weight = "You must enter a minimum and maximum weight";
  }else if(!/^[0-9]+$/.test(input.weight)) {
    errors.weight = ""

  };

  if(!input.life_span) errors.life_span = "You must enter a fife span";
  return errors;
}

//============================>> END VALIDATIONS <<==============================\\

  return (
    <div className={style.container}>
      <div className={style.nav}>
        <Link to='/home'>
          <button className={style.btn} >Back to Home</button>
        </Link>
      </div> 
      <div className={style.form}>
        <h2 className={style.h1}>Create</h2>
        <form onSubmit={handlerSubmit}>
          <div className={style.div}>
            <label className={style.title} htmlFor="name">Name:</label>
             <input 
              className={errors.name && style.error} 
              name="name"  
              value={input.name}
              type="text"
              onChange={handlerChange}
            /> 
          </div>
           {errors.name && <p className={style.p}>{errors.name}</p>}

          <div className={style.div}>
            <label className={style.title} htmlFor="image">Image:</label>
            <input 
              name="image" 
              value={input.image}
              type="text"
              onChange={handlerChange}
            />
          </div>  
          <p className={style.p}>{errors.image}</p>

          <div className={style.dog}>
            <div className={style.height}>
              <div className={style.div}>
                <label className={style.title} htmlFor="height">Height: </label>
                <input 
                  className={errors.height && style.error}
                  type="number" 
                  name="height"
                  min="0"
                  max="200"
                  value={input.height}
                  onChange={handlerChange}
                />
              </div>
            </div>
          </div>
          <div className={style.dog}>
            <div className={style.weight}>
              <div className={style.div}>
                <label className={style.title} htmlFor="weight">Weight: </label>
                <input 
                  className={errors.weight && style.error}
                  type="number" 
                  name="weight"
                  min="0"
                  max="200"
                  value={input.weight}
                  onChange={handlerChange}
                />
              </div>
            </div>
          </div>
          {
            input.name === "" ? (
              <button className={style.btn2} type="submit" onClick={handleError}>Create</button>
            ) : <button className={style.btn2} type="submit" >Create</button>
          }
        </form>
      </div>
    </div>
  )
}