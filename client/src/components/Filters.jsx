import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperaments, filterDogsByApi, changePage, sortByWeight, sortByName, } from "../redux/action";
import style from '../styles/Filter.module.css'

export default function Filters() {

    // X Botones/Opciones para filtrar por:
  //    Temperamento
  //    Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
  // X Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  //    Orden alfabético
  //    Peso


  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const temperaments = useSelector((state) => state.tempers)
//console.log(temperaments.map(e => e))

  function handlerFilterByTemps(e) {
    dispatch(filterByTemperaments(e.target.value)); 
  }

  function handlerFilterApi(e) {
    dispatch(filterDogsByApi(e.target.value));
  }

  function handlerOrderWeight(e) {
    dispatch(sortByWeight(e.target.value));
    setOrder(`Ordenado ${e.target.value}`); 
  }

  function handlerOrderAlfab(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));  
    //setCurrentPage(0); 
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div> 
      <select onChange={handlerOrderAlfab} className={style.orden}>
        <option hidden>Sort by alfb...</option>
        <option value="AZ">A-Z</option>
        <option value="ZA">Z-A</option>
      </select>
      <select onChange={handlerOrderWeight} className={style.peso}>
        <option hidden>Sort by weight...</option>
        <option value="asc">menor a mayor...</option>
        <option value="desc">mayor a menor...</option>
      </select>
      <select onChange={handlerFilterByTemps} className={style.tem}>
        <option hidden>Filter Temperament...</option>
        <option value="all"> All </option>
        {temperaments?.map((t) => {
          //muestro todos los temperamentos como opciones
          return (
            <option 
              name='all'
              value={t.name} 
              key={`filter_+${t.id}`}
              > {t.name} </option>
          );
        })}
      </select>
      <select onChange={handlerFilterApi} className={style.origen}>
        <option hidden>Filter by origin...</option>
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="api">Api</option>
      </select>
    </div>
  );
}
