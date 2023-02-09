import React from "react";
import { Link } from "react-router-dom";
import style from '../styles/LandingPage.module.css';

export default function LandingPage() {

  // Alguna imagen de fondo representativa al proyecto
  // Botón para ingresar al home

  return (
    <div className={style.landing} >
      <h2> Welcome </h2>
      <Link to='/home' >
        <button> Get into </button>
      </Link>
    </div>
  )

}