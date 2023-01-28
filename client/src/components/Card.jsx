import React from "react";
import style from '../styles/Card.module.css;';

export default function Card({ name, image, temperament, weight }) {

// Área donde se verá el listado de razas de perros. Deberá mostrar su:
  // - Imagen
  // - Nombre
  // - Temperamento
  // - Peso

  return (
    <div className={style.card} >
      <h4 className={style.name} >{name}</h4>
      <img className={style.image} src={image} alt="" />
      <div>
        
      </div>
    </div>
  )
}