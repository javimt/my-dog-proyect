import React, { useState, useEffect } from "react";
import style from '../styles/Form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { getTemperaments, createDogs, getDogs, updateDog } from "../redux/action";

export default function Form() {

  // Un formulario controlado con JavaScript con los siguientes campos:
  // Nombre
  // Altura (Diferenciar entre altura mínima y máxima)
  // Peso (Diferenciar entre peso mínimo y máximo) 
  // Años de vida
  // Posibilidad de seleccionar/agregar uno o más temperamentos
  // Botón/Opción para crear una nueva raza de perro
  
  const { search } = useLocation();
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogsRender);
  const tempers = useSelector(state => state.tempers);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const dataId = search && search.slice(4)

  const initialState = dataId ? dogs.flat().filter(e => e.id === dataId)[0] : {
    name: "",
    image: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    temperaments: []
  }
  const [input, setInput] = useState({
    name: initialState.name ? initialState.name : "",
    image: initialState.image ? initialState.image : "",
    weightMin: initialState.weightMin ? initialState.weightMin : "",
    weightMax: initialState.weightMax ? initialState.weightMax : "",
    heightMin: initialState.heightMin ? initialState.heightMin : "",
    heightMax: initialState.heightMax ? initialState.heightMax : "",
    life_span: initialState.life_span ? initialState.life_span : "",
    temperaments: []
  })

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  },[dispatch]); 


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

  async function handlerSubmit(e) {

    e.preventDefault();
console.log(errors)
    if(!Object.keys(errors).length){
      if(dataId) {
        updateDog(input, dataId);
        history.push('/home');
      } else {
        const created = await createDogs(input)
        if(created !== 'its was created!') {
          alert("dog created!")
          history.push('/home');
        } else {
          alert('the dog already exist');
        }
      }
      dispatch(getDogs())
      dispatch(getTemperaments())
    }
  }

  function handlerSelect(e) {
    if(!input.temperaments.includes(e.target.value) && e.target.value !== "select") {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value]
      });
    }
  }

  function handlerError(e) {
    e.preventDefault();
    if(input.length < 8) alert("Complete the form!");
    else alert("dog created!")
  }

  function handlerDeleteTempers(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(t => t !== e.target.name)
    })
  }

//============================>> END HANDLERS <<==============================\\

//============================>> VALIDATIONS <<==============================\\

const validate = (input) => {
  const errors = {};

  //=========>> NAME <<========\\
  if(!input.name) {
    errors.name = "You must enter a breed name⚠️";
  } else if(!/^[a-zA-Z]+$/.test(input.name)) {
    errors.name = "Invalid name. The name must contain letters⚠️";
  } else if(input.name.length < 2) {
    errors.name = "The name must contain at least 2 letters⚠️"
  } else if(input.name.length < 2 || input.name.length > 20) {
    errors.name = "At least 2 letters, less than 20⚠️";
  } else if(dogs.includes(input.name)) {
    errors.name = "The dog already exists, use another name⚠️";
  };
  //=========>> END NAME <<========\\

//=========>> HEIGHT <<========\\
 if(input.image.length === 0) {
    errors.image = "Must contain an image⚠️"
  }  /* else if(!/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.test(input.image)){
    errors.image = "It's not a correct format "
  } */
    
//=========>> HEIGHT <<========\\

  //=========>> HEIGHT <<========\\
  if(!input.heightMax) {
    errors.heightMax = "You must enter a maximum height⚠️";
  } else if(input.heightMax > 200) {
    errors.heightMax = "The maximum height must be less than 200cm⚠️"
  } else if(!/^[0-9]+$/.test(input.heightMax)) {
    errors.heightMax = "Can only contain numbers⚠️";
  }

  if(!input.heightMin) {
    errors.heightMin = "You must enter a minimum height⚠️";
  } else if(input.heightMin === input.heightMax) {
    errors.heightMin = "The minimum and maximun height cannot be equals⚠️"
  } else if(input.heightMin >= input.heightMax) {
    errors.heightMin = "The minimum height cannot be greater than the maximum height⚠️"
  } else if(!/^[0-9]+$/.test(input.heightMin)) {
    errors.heightMin = "Can only contain numbers⚠️";
  }
  //=========>> END HEIGHT <<========\\
  
  //=========>> WEIGHT <<========\\
  if(!input.weightMax) {
    errors.weightMax = "You must enter a maximum weight⚠️";
  } else if(input.weightMax > 200 && input.weightMax < 1000) {
    errors.weightMax = "The maximum height must be less than 200cm⚠️"
  } else if(!/^[0-9]+$/.test(input.weightMax)) {
    errors.weightMax = "Can only contain numbers⚠️";
  };

  if(!input.weightMin) {
    errors.weightMin = "You must enter a minimum and maximum weight⚠️";
  } else if(input.heightMin === input.heightMax) {
    errors.heightMin = "The minimum and maximun height cannot be equals⚠️"
  } else if(input.weightMin >= input.weightMax) {
    errors.weightMin = "The minimum weight cannot be greater than the maximum weight⚠️"
  } else if(!/^[0-9]+$/.test(input.weightMin)) {
    errors.weightMin = "Can only contain numbers⚠️";
  };
  //=========>> END HEIGHT <<========\\

  //=========>> LIFE_SPAN <<=========\\
  if(!input.life_span) {
    errors.life_span = "You must enter a life span⚠️";
  } else if(!/^[0-9]+$/.test(input.life_span)) {
    errors.life_span = "Can only contain numbers⚠️";
  } else if(input.life_span.length === 0) {
    errors.life_span = "You need a life_span⚠️"
  }
  //=========>> END LIFE_SPAN <<=========\\

  return errors;
}
//============================>> END VALIDATIONS <<==============================\\

  return (
    <div className={style.container}>
      <Link to='/home'>
        <button className={style.btn} >Back to Home</button>
      </Link>
      <div className={style.form}>
        <h2 className={style.h1}>Create</h2>
        <form onSubmit={handlerSubmit}>
          <div className={style.div}>
            {/* <label className={style.title} htmlFor="name">Name:</label> */}
             <input 
              className={errors.name ? style.error : style.input}  
              name="name"  
              value={input.name}
              type="text"
              onChange={handlerChange}
              placeholder="write your Name..."
            /> 
          </div>
           {errors.name && <p className={style.p}>{errors.name}</p>}

          <div className={style.div}>
            {/* <label className={style.title} htmlFor="image">Image:</label> */}
            <input 
              className={errors.image ? style.error : style.input}
              name="image" 
              value={input.image}
              type="text"
              onChange={handlerChange}
              placeholder="Insert your image..."
            />
          </div>  
          <p className={style.p}>{errors.image}</p>

          <div className={style.dog}>
            <div className={style.height}>
              <div className={style.div}>
                {/* <label className={style.title} htmlFor="heightMin">HeightMin: </label> */}
                <input 
                  className={errors.heightMin ? style.error : style.input}
                  type="number" 
                  name="heightMin"
                  min="0"
                  max="100"
                  value={input.heightMin}
                  onChange={handlerChange}
                  placeholder="Insert min height..."
                />
                <p className={style.p}>{errors.heightMin}</p>
                
                {/* <label className={style.title} htmlFor="heightMax">HeightMax: </label> */}
                <input 
                  className={errors.heightMax ? style.error : style.input}
                  type="number" 
                  name="heightMax"
                  min="0"
                  max="200"
                  value={input.heightMax}
                  onChange={handlerChange}
                  placeholder="Insert max height..."
                />
                <p className={style.p}>{errors.heightMax}</p>
              </div>
            </div>
          </div>
          <div className={style.dog}>
            <div className={style.weight}>
              <div className={style.div}>
                {/* <label className={style.title} htmlFor="weightMin">WeightMIn: </label> */}
                <input 
                  className={errors.weightMin ? style.error : style.input}
                  type="number" 
                  name="weightMin"
                  min="0"
                  max="100"
                  value={input.weightMin}
                  onChange={handlerChange}
                  placeholder="Insert min weight..."
                />
                <p className={style.p}>{errors.weightMin}</p>
                
                {/* <label className={style.title} htmlFor="weightMax">WeightMax: </label> */}
                <input 
                  className={errors.weightMax ? style.error : style.input}
                  type="number" 
                  name="weightMax"
                  min="0"
                  max="200"
                  value={input.weightMax}
                  onChange={handlerChange}
                  placeholder="Insert max weight..."
                />
                <p className={style.p}>{errors.weightMax}</p>
              </div>
            </div>
          </div>
          <div className={style.div}>
            {/* <label className={style.title} htmlFor="life_span">Life span: </label> */}
            <input 
              className={errors.life_span ? style.error : style.input}
              name="life_span"
              min="0"
              max="100"
              type="number"
              value={input.life_span}
              onChange={handlerChange}
              placeholder="Insert life span..."
            />
            <p className={style.p}>{errors.life_span}</p>
          </div>
          <div className={style.container}>
            <div className={style.select}>
              <label htmlFor="">Temperament: </label>
              <select className={style.selct} onChange={handlerSelect}>
                <option className={errors.temperaments ? style.error : style.input} hidden value="">Select</option>
                {
                  tempers?.map(t => 
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
          <div className={style.delete}>
            {input.temperaments.map(t => (
              <div key={t} className={style.temp}>
                <button onClick={handlerDeleteTempers} className={style.x} name={t}>X</button>
                <p className={style.p}>{t}</p>
              </div>
            ))}
          </div>
          {
            input.name !== " " ? (
              <button 
                className={style.btn1} 
                type="submit" >{dataId ? "Update" : "Create"}</button>
            ) : <button className={style.btn2} onClick={handlerError} type="submit" >Created</button>
          }
        </form>
      </div>
    </div>
  )
}