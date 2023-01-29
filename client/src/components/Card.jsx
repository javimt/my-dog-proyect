import React from "react";
import style from '../styles/Card.module.css';

export default function Card({ name, image, temperament, weight }) {

// Área donde se verá el listado de razas de perros. Deberá mostrar su:
  // - Imagen
  // - Nombre
  // - Temperamento
  // - Peso

//{weight.map(e => e.metric.slice(0, 4))}
  return (
    <div className={style.card} >
      <h4 className={style.name} >{name}</h4>
      <img className={style.image} src={image} alt="" width="200px" height="120px" />
      <p className={style.temp} >{temperament}</p>
      <div className={style.weight} > 
        <p>weight: {weight}</p>
      </div>
    </div>
  )
}