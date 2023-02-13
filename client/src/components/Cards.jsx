import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../redux/action";
import style from "../styles/Cards.module.css";
//import Pages from "./Pages";

export default function Cards() {
  const stateDog = useSelector(state => state.dogsRender);
  const page = useSelector((state) => state.page);
  const allPages = stateDog.map((e, i) => {return { i };});
  const dispatch = useDispatch();

console.log(allPages)
console.log()
 
  useEffect(() => {
    if (!stateDog.length) dispatch(getDogs());
  }, []);

  return (
    <div className={style.allCards}>
      {allPages.length ? stateDog[page].map((d) => {
//console.log(d.Temperaments)
          return (
            <div key={d.id}>
              <Link to={`/dogs/${d.id}`}>
                <Card
                  name={d.name}
                  image={d.image}
                  weightMin={d.weightMin}
                  weightMax={d.weightMax}
                  temperament={
                    d.Temperaments ? 
                    d.Temperaments.map((e) => e.name).join(",") : 
                    d.temperament
                  }
                />
              </Link>
            </div>
          );
        }): <h2>no llegó nada</h2>
      }
    </div>
  );
}
