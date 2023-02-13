import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changePage, getDogs } from "../redux/action";
import style from "../styles/Cards.module.css";
//import Pages from "./Pages";

export default function Cards() {
  const stateDog = useSelector(state => state.dogsRender);
  const page = useSelector((state) => state.page);
  const pages = useSelector(state => state.pages);
  const allPages = stateDog.map((e, i) => {return { i };});
  const dispatch = useDispatch();
  /*  const [currentPage, setCurrentPage] = useState(1); 
  const [dogsPerPage, setDogsPerPage] = useState(8); 
  const indexOfLastDog = currentPage * dogsPerPage; 
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);  
console.log(allDogs.slice(indexOfFirstDog, indexOfLastDog))
console.log(page)
console.log(currentDogs) */
  /* const pageNumber = []
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i); 
console.log(i)
  }
 */
  useEffect(() => {
    if (!stateDog.length) dispatch(getDogs());
    //dispatch(changePage())
  }, []);

  return (
    <div className={style.allCards}>
      {/* <Pages 
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.legth}
        handlerPage={handlerNum}
      /> */}
      {allPages[page] ? stateDog[page].map((d) => {
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
