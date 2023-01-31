import React from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";
import style from '../styles/Home.module.css';


export default function Home() {

  //  Input de búsqueda para encontrar razas de perros por nombre
  //  Área donde se verá el listado de razas de perros. Deberá mostrar su:
  //Imagen
  //Nombre
  //Temperamento
  //Peso
  //  Botones/Opciones para filtrar por:
  //Temperamento
  //Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
  //  Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  //Orden alfabético
  //Peso
  //  Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

  return (
    <div className={style.body} >
      <NavBar />
      <Cards />
    </div>
  )
}