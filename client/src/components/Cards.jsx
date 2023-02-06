import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs } from "../redux/action";
// import style from '../styles/Card.module.css'

export default function Cards() {
  const stateDog = useSelector(state => state.dogsRender);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  },[])
//console.log(stateDog)
  return (
    <div>
      {
        stateDog.length ? stateDog.map(d => {
  console.log(d.Temperaments)
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
        }) : <h2></h2>
      } 
    </div>
  );
}