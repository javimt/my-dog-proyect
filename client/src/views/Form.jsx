import React, { useState, useEffect } from "react";
import style from '../styles/Form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getTemperaments, createDogs, getDogs, deleteDog, updateDog } from "../redux/action";
//import queryString from "query-string";
//import DeleteUpdate from "../components/DeleteUpdate";

export default function Form() {

  // Un formulario controlado con JavaScript con los siguientes campos:
  // Nombre
  // Altura (Diferenciar entre altura mínima y máxima)
  // Peso (Diferenciar entre peso mínimo y máximo) 
  // Años de vida
  // Posibilidad de seleccionar/agregar uno o más temperamentos
  // Botón/Opción para crear una nueva raza de perro
  
  const { search } = useLocation();
  //const { visit } = queryString();
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogsRender);
  const tempers = useSelector(state => state.tempers);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const dataId = search && search.slice(4)
console.log(dataId)

  const [input, setInput] = useState({
    name: "",
    image: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    temperaments: []
  })
//console.log(dogs) 

  /* useEffect(() => {
    if(!input.name.length > 0 && !input.heightMin.length > 0 && !input.heightMax.length > 0  && !input.weightMin.length > 0 && !input.weightMax.length > 0)setButton(false);
    else setButton(true)
  },[]); */

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  },[]); 


//============================>> HANDLERS <<==============================\\

  function handlerChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
//console.log(input)
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    )
  }

  //const [selectStateName, setSelectStateName] = useState([])
  async function handlerSubmit(e) {

    e.preventDefault();
    if(dataId) {
      updateDog(input, dataId);
      history.push('/home');
    } else {
      const created = await createDogs(input)
      if(created != 'its was created!') {
        alert("dog created!")
        history.push('/home');
      } else {
        alert('dogs already exist' );
      }
console.log(created)
    }
    dispatch(getDogs())
    dispatch(getTemperaments())

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
    if(input.length === 0) alert("Complete the form!");
    alert("dog created!")
    //setButton(errors)
  }

  function handlerDeleteTempers(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(t => t !== e.target.name)// d.Temperaments ? d.Temperaments.map(e => e.name).join(",") : d.temperament
    })
  }

  /* function handlerDelete(e) {
    dispatch(deleteDog(e.target.value))
  }

  function handlerUpdate(e) {
    dispatch(updateDog(e.target.value))
  } */

//============================>> END HANDLERS <<==============================\\

//============================>> VALIDATIONS <<==============================\\

const validate = (input) => {
  const errors = {};

  //=========>> NAME <<========\\
  if(!input.name) {
    errors.name = "You must enter a breed name";
  } else if(!/^[a-zA-Z]+$/.test(input.name)) {
    errors.name = "Invalid name. The name must contain letters";
  } else if(input.name.length < 2) {
    errors.name = "The name must contain at least 2 letters"
  } else if(input.name.length < 2 || input.name.length > 20) {
    errors.name = "At least 2 letters, less than 20";
  } else if(dogs.includes(input.name)) {
    errors.name = "The dog already exists, use another name";
  };
  //=========>> END NAME <<========\\

//=========>> HEIGHT <<========\\
  if(input.image.length === 0) {
    errors.image = "Must contain an image"
  } /* else if(!/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.test(input.image)){
    errors.image = "It's not a correct format "
  } */
    
//=========>> HEIGHT <<========\\

  //=========>> HEIGHT <<========\\
  if(!input.heightMax) {
    errors.heightMax = "You must enter a maximum height";
  } else if(input.heightMax > 200) {
    errors.heightMax = "The maximum height must be less than 200cm"
  } else if(!/^[0-9]+$/.test(input.heightMax)) {
    errors.heightMax = "Can only contain numbers";
  }

  if(!input.heightMin) {
    errors.heightMin = "You must enter a minimum height";
  } else if(input.heightMin === input.heightMax) {
    errors.heightMin = "The minimum and maximun height cannot be equals"
  } else if(input.heightMin >= input.heightMax) {
    errors.heightMin = "The minimum height cannot be greater than the maximum height"
  } else if(!/^[0-9]+$/.test(input.heightMin)) {
    errors.heightMin = "Can only contain numbers";
  }
  //=========>> END HEIGHT <<========\\
  
  //=========>> WEIGHT <<========\\
  if(!input.weightMax) {
    errors.weightMax = "You must enter a maximum weight";
  } else if(input.weightMax > 200 && input.weightMax < 1000) {
    errors.weightMax = "The maximum height must be less than 200cm"
  } else if(!/^[0-9]+$/.test(input.weightMax)) {
    errors.weightMax = "Can only contain numbers";
  };

  if(!input.weightMin) {
    errors.weightMin = "You must enter a minimum and maximum weight";
  } else if(input.heightMin === input.heightMax) {
    errors.heightMin = "The minimum and maximun height cannot be equals"
  } else if(input.weightMin >= input.weightMax) {
    errors.weightMin = "The minimum weight cannot be greater than the maximum weight"
  } else if(!/^[0-9]+$/.test(input.weightMin)) {
    errors.weightMin = "Can only contain numbers";
  };
  //=========>> END HEIGHT <<========\\

  //=========>> LIFE_SPAN <<=========\\
  if(!input.life_span) {
    errors.life_span = "You must enter a life span";
  } else if(!/^[0-9]+$/.test(input.life_span)) {
    errors.life_span = "Can only contain numbers";
  } else if(input.life_span.length === 0) {
    errors.life_span = "You need a life_span"
  }
  //=========>> END LIFE_SPAN <<=========\\

  //=========>> TEMPERAMENT <<==========\\
  if (input.temperaments.length === 0) {
    errors.temperaments = "You must select a temperaments";
  } else if(!/^[a-zA-Z]+$/.test(input.temperaments)) {
    errors.temperaments = "You need select one temperaments"
  } /* else if(input.temperaments === input.temperaments) {
    errors.temperaments = "You can't repeat temperaments"
  } */
  //==========>> END TEMPERAMENT <<==========\\

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
            <label className={style.title} htmlFor="name">Name:</label>
             <input 
              className={errors.heightMin ? style.error : style.input} 
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
              className={/* errors.heightMin ? style.error :  */style.input}
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
                  className={errors.heightMin ? style.error : style.input}
                  type="number" 
                  name="heightMin"
                  min="0"
                  max="100"
                  value={input.heightMin}
                  onChange={handlerChange}
                />
                <p className={style.p}>{errors.heightMin}</p>
                
                <label className={style.title} htmlFor="heightMax">HeightMax: </label>
                <input 
                  className={errors.heightMax ? style.error : style.input}
                  type="number" 
                  name="heightMax"
                  min="0"
                  max="200"
                  value={input.heightMax}
                  onChange={handlerChange}
                />
                <p className={style.p}>{errors.heightMax}</p>
              </div>
            </div>
          </div>
          <div className={style.dog}>
            <div className={style.weight}>
              <div className={style.div}>
                <label className={style.title} htmlFor="weightMin">WeightMIn: </label>
                <input 
                  className={errors.weightMin ? style.error : style.input}
                  type="number" 
                  name="weightMin"
                  min="0"
                  max="100"
                  value={input.weightMin}
                  onChange={handlerChange}
                />
                <p className={style.p}>{errors.weightMin}</p>
                
                <label className={style.title} htmlFor="weightMax">WeightMax: </label>
                <input 
                  className={errors.weightMax ? style.error : style.input}
                  type="number" 
                  name="weightMax"
                  min="0"
                  max="200"
                  value={input.weightMax}
                  onChange={handlerChange}
                />
                <p className={style.p}>{errors.weightMax}</p>
              </div>
            </div>
          </div>
          <div className={style.div}>
            <label className={style.title} htmlFor="life_span">Life span: </label>
            <input 
              className={errors.life_span ? style.error : style.input}
              name="life_span"
              min="0"
              max="100"
              type="number"
              value={input.life_span}
              onChange={handlerChange}
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
                /* disabled={!input.name || errors.name || errors.heightMin || errors.image  || errors.heightMax || errors.weightMin || errors.weightMax || errors.temperaments} */
                className={style.btn1} 
                type="submit" >{dataId ? "Update" : "Create"}</button>
            ) : <button className={style.btn2} onClick={handlerError} type="submit" >Created</button>
          }
          {/* {
          <div>
            <button
              disabled={dogs.length < 172}
              type="submit" 
              onClick={() => handlerDelete(id)} >Delete</button>
            <button
              disabled={dogs.length < 172}
              type="submit" 
              onClick={() => handlerUpdate(id)} >Update</button>
          </div>
          } */}
        </form>
        
      </div>
    </div>
  )
}