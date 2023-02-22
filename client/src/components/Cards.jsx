import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../redux/action";
import style from "../styles/Cards.module.css";

export default function Cards() {
  const stateDog = useSelector(state => state.dogsRender);
  const allDogs = useSelector(state => state.allDogs)
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (!allDogs.length) dispatch(getDogs());
  },[allDogs,dispatch]);

  return (
    stateDog.length ? 
    <div className={style.allCards}>
      {stateDog.length && stateDog[page].map((d) => {
          return (
            <div key={`card_${d.id}`}>
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
                  created= {d.createdInDb}
                />
              </Link>
            </div>
          );
        })
      }
    </div> : !stateDog.length && !allDogs.length ? 
              <h2 className={style.option}>Dog not found</h2> :
              <h2>Loading...</h2>
  );
}
