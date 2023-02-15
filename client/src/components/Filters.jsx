import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperaments, filterDogsByApi, sortByWeight, sortByName, getTemperaments } from "../redux/action";
import style from '../styles/Filters.module.css';

export default function Filters() {

  // X Botones/Opciones para filtrar por:
  //    Temperamento
  //    Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
  // X Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  //    Orden alfabético
  //    Peso

  useEffect(() => {
    dispatch(getTemperaments());
  },[])

  const dispatch = useDispatch();
  const tempers = useSelector((state) => state.tempers)
console.log()

  function handlerFilterByTemps(e) {
    dispatch(filterByTemperaments(e.target.value)); 
  }

  function handlerFilterApi(e) {
    dispatch(filterDogsByApi(e.target.value));
  }

  function handlerOrderWeight(e) {
    dispatch(sortByWeight(e.target.value));
  }

  function handlerOrderAlfab(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
  }

  return (
    <div className={style.container}> 
      <select onChange={handlerOrderAlfab} className={style.order}>
        <option hidden>Sort by alfb...</option>
        <option className={style.select} value="AZ">A-Z</option>
        <option className={style.select} value="ZA">Z-A</option>
      </select>
      <select onChange={handlerOrderWeight} className={style.weight}>
        <option hidden>Sort by weight...</option>
        <option className={style.select} value="asc">menor a mayor...</option>
        <option className={style.select} value="desc">mayor a menor...</option>
      </select>
      <select onChange={handlerFilterByTemps} className={style.temperament}>
        <option hidden>Filter Temperament...</option>
        <option className={style.select} value="all"> All </option>
        {tempers.length && tempers.map((t) => {
          return (
            <option 
              className={style.select}
              value={t.name} 
              key={`filter_${t.id}`}
            > {t.name} </option>
          );
        })}
      </select>
      <select onChange={handlerFilterApi} className={style.origin}>
        <option hidden >Filter by origin...</option>
        <option className={style.select} value="all">All</option>
        <option className={style.select} value="created">Created</option>
        <option className={style.select} value="api">Api</option>
      </select>
    </div>
  );
}
