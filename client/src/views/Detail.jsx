import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom';
import { getDetail, getDogs } from "../redux/action";
import style from '../styles/Detail.module.css';
//import NavBar from "../components/NavBar";

export default function Detail() {

  // Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
  // Altura
  // Peso
  // Años de vida

  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail);
  const data = useSelector(state => state.allDogs)
console.log(detail)

  useEffect(() => {
   if(!data.length)dispatch(getDogs());
   else dispatch(getDetail(id));
  },[])

  return detail.hasOwnProperty("name") ? (
    <div className={style.body}>
      {/* <NavBar /> */}
      <div className={style.btn}>
        <Link to='/home'>
          <button>Go Back</button>
        </Link>
      </div>
      <h3 className={style.id}>Dog Number: {detail.id}</h3>
      {/*<h3 className={style.title}>{data.name}</h3>
      <img className={style.image} src={data.image} alt=""  width="250px"/>
      <h3 className={style.temperament}>temperaments: {data.temperament}
        {
          ! data.createdInDb
          ? data.temperament + " "
          : data.temperament.split(", ").map(t => t.name + " ")
        } 
      </h3>*/}
      <h3 className={style.life}>life span: {data.life_span}</h3>
      <div className={style.text}>
        <h3 className={style.height}>Height: {data.height}</h3>
        {/* <p>{`Min: ${data.height.slice(0,3)}`}</p> */}
        {/* <p>{`Max: ${data.height.slice(5, 8)}`}</p> */}
      </div>
      <h3 className={style.weight}>Weight: {data.weight}</h3>

    </div>
  ): <div>no llegó nada</div>

}