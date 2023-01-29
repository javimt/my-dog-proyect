import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from 'react-redux';
import { LinK } from 'react-router-dom';


export default function Cards() {
  const stateDog = useSelector(state => state.dogsFilter);
  
  return (
    <div>
      {/* {
        <Card />
      } */}
    </div>
  );
}