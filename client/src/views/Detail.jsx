import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom';
import { getDetail } from "../redux/action";
import style from '../styles/Detail.module.css';
import NavBar from "../components/NavBar";

export default function Detail() {

  // Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
  // Altura
  // Peso
  // Años de vida

  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(state => state.detail);
console.log(data)

  useEffect(() => {
    dispatch(getDetail(id));
  })

  return data.hasOwnProperty("name") ? (
    <div className={style.body}>
      <NavBar />
      <div className={style.btn}>
        <Link to='/home'>
          <button>Go Back</button>
        </Link>
      </div>
      <h3 className={style.id}>Dog Number: {data.id}</h3>
      <h3 className={style.title}>{data.name}</h3>
      <img className={style.image} src={data.image} alt=""  width="250px"/>
      <h3 className={style.temperament}>temperaments: {data.temperament}
        {/* {
          ! data.createdInDb
          ? data.temperament + " "
          : data.temperament.split(", ").map(t => t.name + " ")
        } */}
      </h3>
      <h3 className={style.life}>life span: {data.life_span}</h3>
      <div className={style.text}>
        <h3 className={style.height}>Height: {data.height}</h3>
        {/* <p>{`Min: ${data.height}`}</p> */}
      </div>
      

    </div>
  ): <div>no llegó nada</div>
}