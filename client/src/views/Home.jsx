import React from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";
import style from '../styles/Home.module.css';


export default function Home() {
  return (
    <div className={style.body} >
      <Cards />
      <NavBar />
    </div>
  )
}