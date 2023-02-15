import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom';
import { getDetail, getDogs } from "../redux/action";
import style from '../styles/Detail.module.css';

export default function Detail() {

  // Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
  // Altura
  // Peso
  // Años de vida

  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail);
  const data = useSelector(state => state.dogsRender);
//console.log(detail.name)

  useEffect(() => {
   if(!data.length)dispatch(getDogs());
   dispatch(getDetail(id));
  },[dispatch])

  return detail.hasOwnProperty("name") ? (
    <div className={style.body}>
      <div className={style.btn}>
        <Link to='/home'>
          <button>Go Back</button>
        </Link>
      </div>
      {/* <h3 className={style.id}>Dog Number: {detail.id}</h3> */}
      <h3 className={style.title}>{detail.name}</h3>
      <img className={style.image} src={detail.image} alt=""  width="250px"/>
      <h3 className={style.temperament}>temperaments: {detail.Temperaments ? detail.Temperaments.map(e => e.name).join(",") : detail.temperament}
      </h3>
     <h3 className={style.life}>life span: {detail.life_span}</h3>
      <div className={style.text}>
        <h3 className={style.height}>Height min: {detail.heightMin}</h3> 
         <h3 className={style.height}>Height max: {detail.heightMax}</h3>
      </div>
      <br />
      <h3 className={style.weight}>Weight min: {detail.weightMin}</h3>
      <h3 className={style.weight}>Weight max: {detail.weightMax}</h3>
    </div>
  ): <div>no llegó nada</div>
}