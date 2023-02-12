import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperaments, filterDogsByApi, changePage, sortByWeight, sortByName, } from "../redux/action";
import style from '../styles/Filter.module.css'

export default function Filters(setCurrentPage) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const temperaments = useSelector((state) => state.tempers)

  function handlerFilterByTemps(e) {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value)); //e.target.value es lo que viene del select, el payload
    //setCurrentPage(1); 
  }

  function handlerFilterApi(e) {
    e.preventDefault();
    dispatch(filterDogsByApi(e.target.value));
    //setCurrentPage(0);
  }

  function handlerOrderWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    //setCurrentPage(0); //cuando hago el ordenamiento seteo para que arranque en la prim página
    setOrder(`Ordenado ${e.target.value}`); //cuando seteo esta página, me modifica el estado local y lo modifica
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
        <option value="all">All</option>
        {temperaments?.map((t) => {
          //muestro todos los temperamentos como opciones
          return (
            <option value={t.name} key={t.id}>
              {t.name}
            </option>
          );
        })}
      </select>
      <select onChange={handlerFilterApi} className={style.origen}>
        <option hidden>Filtrar por origen...</option>
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="api">Api</option>
      </select>
    </div>
  );
}
