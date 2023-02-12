import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePage, getDogs } from "../redux/action";
import style from "../styles/Cards.module.css";

export default function Cards() {
  const stateDog = useSelector(state => state.dogsRender);
  const page = useSelector(state => state.page);
  //const pages = useSelector(state => state.pages);
  const allPages = stateDog.map((e,i) => {return{i}})
//console.log(allPages)
  const dispatch = useDispatch();

  useEffect(() => {
    if(!stateDog.length)dispatch(getDogs());
    dispatch(changePage(allPages))
  },[])
//console.log(stateDog)
  return (
    <div className={style.allCards}>
      {
        allPages[page] ? stateDog[page].map(d => {
//console.log(d.Temperaments)
          return (
            <div key={d.id}>
              <Link to={`/dogs/${d.id}`} >
                <Card 
                  name={d.name}
                  image={d.image}
                  weightMin={d.weightMin}
                  weightMax={d.weightMax}
                  temperament={d.Temperaments ? d.Temperaments.map(e => e.name).join(",") : d.temperament}
                />
              </Link>
            </div>
          )
        }) : <h2>no llegó nada</h2>
      } 
    </div>
  );
}