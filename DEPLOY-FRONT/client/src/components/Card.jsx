import React from "react";
import style from '../styles/Card.module.css';

export default function Card({ name, image, temperament, weightMin, weightMax }) {

// Área donde se verá el listado de razas de perros. Deberá mostrar su:
  // - Imagen
  // - Nombre
  // - Temperamento
  // - Peso

  return (
    <div className={style.card} >
      <h4 className={style.name} >{name}</h4>
      <img className={style.image} src={image} alt=""  />
      <p className={style.p}>Temperament: {temperament}</p>
      <div> 
        <h3 className={style.p}>Weight min: {weightMin}</h3>
        <h3 className={style.p}>Weight max: {weightMax}</h3>
      </div>
    </div>
  )
}