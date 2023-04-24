import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom';
import { getDetail } from "../redux/action";
import style from '../styles/Detail.module.css';
import DeleteUpdate from "../components/DeleteUpdate";

export default function Detail() {

  // Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
  // Altura
  // Peso
  // Años de vida

  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail);
  const [, setDetailId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function renderDetail() {
      const response = await dispatch(getDetail(id));
      setDetailId(response);
      setLoading(false);
    }
    renderDetail();
  },[dispatch,id]);

  if (loading) {
    return <div>loading...</div>;
  }

  return detail.hasOwnProperty("name") ? (
    <div className={style.body}>
      <div className={style.btn}>
        <Link to='/home'>
          <button>Go Back</button>
        </Link>
      </div>
      <div>
        { detail.hasOwnProperty("createdInDb") &&
          <DeleteUpdate 
          id={id}
        />}
      </div>
      <h3 className={style.title}>{detail.name}</h3>
      <img className={style.image} src={detail.image} alt=""  width="250px"/>
      <h3 className={style.temperament}>temperaments: {detail.Temperaments ? detail.Temperaments.map(e => e.name).join(",") : detail.temperament}
      </h3>
     <h3 className={style.life}>life span: {detail.life_span}</h3>
      <div className={style.text}>
        <h3 className={style.height}>Height min: {detail.heightMin}</h3> 
        <h3 className={style.height}>Height max: {detail.heightMax}</h3>
      </div>
      <br />
      <h3 className={style.weight}>Weight min: {detail.weightMin}</h3>
      <h3 className={style.weight}>Weight max: {detail.weightMax}</h3>
    </div>
  ): <div>loading...</div>

}