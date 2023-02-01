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
  const data = useSelector(state => state.allDogs);
console.log(detail.name)

  useEffect(() => {
   if(!data.length)dispatch(getDogs());
   dispatch(getDetail(id));
  },[])

  return detail.hasOwnProperty("name") ? (
    <div className={style.body}>
      <div className={style.btn}>
        <Link to='/home'>
          <button>Go Back</button>
        </Link>
      </div>
      <h3 className={style.id}>Dog Number: {detail.id}</h3>
      <h3 className={style.title}>{detail.name}</h3>
      <img className={style.image} src={detail.image} alt=""  width="250px"/>
      <h3 className={style.temperament}>temperaments: {detail.temperament}
       {/* }
          ! detail.createdInDb
          ? detail.temperament + " "
          : detail.temperament.split(", ").map(t => t.name + " ")
        } */}
      </h3>
     <h3 className={style.life}>life span: {detail.life_span}</h3>
      <div className={style.text}>
        <h3 className={style.height}>Height: 
          <p>{`Min: ${detail.height.join("").split("-")[0]}`}</p>
          <p>{`Max: ${detail.height.join("").split("-")[1]}`}</p>
        </h3>  
      </div>
      <br />
      <h3 className={style.weight}>Weight: 
        <p>{`Min: ${detail.weight.join("").split("-")[0]}`}</p>
        <p>{`Max: ${detail.weight.join("").split("-")[1]}`}</p>
      </h3>  
    </div>
  ): <div>no llegó nada</div>
}