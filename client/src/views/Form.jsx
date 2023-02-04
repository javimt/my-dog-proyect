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
//console.log(tempers.map(e => e.name))

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    temperament: []
  })
//console.log(dogs) 

  useEffect(() => {
    if(input.name.length > 0 && input.heightMin.length > 0 && input.heightMax.length > 0  && input.weightMin.length > 0 && input.weightMax.length > 0)setButton(false);
    else setButton(true)
  },[input, setButton]);

  useEffect(() => {
    //dispatch(createDogs())
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

  const [selectStateName, setSelectStateName] = useState([])
  function handlerSubmit(e) {
    e.preventDefault();
    if(!errors.name && !errors.heightMin && !errors.heightMax &&!errors.weightMin && !errors.weightMax) {
      dispatch(createDogs(input));
      alert("dog created!");
      setInput("");
      setSelectStateName([])
    } else if(!input.temperament.length) {
        alert("Temperament are missing");
      } else {
        alert("Imcomplete required fields!")
      }
    //}
  }

  function handlerSelect(e) {
    if(input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
      });
    }
    const value = e.target.value;
console.log(value);
    if(value === "Select") {
      setInput({...input, temperament:[...input.temperament, value]});

    }
    /*setInput({
      ...input,
      temperament:
      ! input.temperament.includes(value) && value !== 'Select'
      ? [...input.temperament, value]
      : [...input.temperament]
    }) */
  }

  function handlerError(e) {
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
  if(!input.heightMax) {
    errors.heightMax = "You must enter a maximum height";
  } else if(input.heightMax > 0) {
    errors.heightMax = "The minimum height must be less than 70cm"
  } else if(!/^[0-9]+$/.test(input.heightMax)) {
    errors.heightMax = "Can only contain numbers";
  }

  if(!input.heightMin) {
    errors.heightMin = "You must enter a minimum height";
  } else if(input.heightMin >= input.heightMax) {
    errors.heightMin = "The minimum height must be less than 70cm"
  } else if(!/^[0-9]+$/.test(input.heightMin)) {
    errors.heightMin = "Can only contain numbers";
  }
  //=======>> END HEIGHT <<======\\
  
  //=======>> WEIGHT <<======\\
  if(!input.weightMax) {
    errors.weightMax = "You must enter a minimum and maximum weight";
  }else if(!/^[0-9]+$/.test(input.weightMax)) {
    errors.weightMax = "Can only contain numbers";
  };

  if(!input.weightMin) {
    errors.weightMin = "You must enter a minimum and maximum weight";
  }else if(!/^[0-9]+$/.test(input.weightMin)) {
    errors.weightMin = "Can only contain numbers";
  };
  //=======>> END HEIGHT <<======\\

  //=======>> LIFE_SPAN <<======\\
  if(!input.life_span) {
    errors.life_span = "You must enter a fife span";
  } else if(!/^[0-9]+$/.test(input.life_span)) {
    errors.life_span = "Can only contain numbers";
  }
  //=======>> END LIFE_SPAN <<======\\

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
                <label className={style.title} htmlFor="heightMin">HeightMin: </label>
                <input 
                  className={errors.heightMin && style.error}
                  type="number" 
                  name="heightMin"
                  min="0"
                  max="70"
                  value={input.heightMin}
                  onChange={handlerChange}
                />
                <label className={style.title} htmlFor="heightMax">HeightMax: </label>
                <input 
                  className={errors.heightMax && style.error}
                  type="number" 
                  name="heightMax"
                  min="70"
                  max="200"
                  value={input.heightMax}
                  onChange={handlerChange}
                />
              </div>
            </div>
          </div>
          <div className={style.dog}>
            <div className={style.weight}>
              <div className={style.div}>
                <label className={style.title} htmlFor="weightMin">WeightMIn: </label>
                <input 
                  className={errors.weightMin && style.error}
                  type="number" 
                  name="weightMin"
                  min="0"
                  max="70"
                  value={input.weightMin}
                  onChange={handlerChange}
                />
                <br />
                <label className={style.title} htmlFor="weightMax">WeightMax: </label>
                <input 
                  className={errors.weightMax && style.error}
                  type="number" 
                  name="weightMax"
                  min="70"
                  max="200"
                  value={input.weightMax}
                  onChange={handlerChange}
                />
              </div>
            </div>
          </div>
          <div className={style.div}>
            <label className={style.title} htmlFor="life_span">Life span: </label>
            <input 
              className={errors.life_span && style.error}
              name="life_span"
              value={input.life_span}
              onChange={handlerChange}
            />
          </div>
          <div className={style.container}>
            <div className={style.select}>
              <label htmlFor="">Temperament: </label>
              <select onChange={handlerSelect}>
                {
                  tempers.map(t => 
                    <option 
                      name="tempers"
                      value={t.name}
                      key={t.id}
                    > {t.name} </option>
                  )
                }
              </select>
            </div>
          </div>
          
          {
            input.name === "" ? (
              <button 
                disabled={!input.name || errors.name || errors.heightMin || errors.heightMax || errors.weightMin || errors.weightMax} 
                className={style.btn2} 
                type="submit" > Create 
              </button>
            ) : <button className={style.btn2} type="submit" onClick={handlerError}>Create</button>
          }
        </form>
      </div>
    </div>
  )
}