import { useDispatch, useSelector } from "react-redux";
import { filterByTemperaments, filterDogsByApi, filterDogsByDb, changePage } from "../redux/action";

export default function Filter() {
  const dispatch = useDispatch();

  

  return (
    <div>
      <select name="" id="">
        <option value=""></option>
      </select>
      <select name="" id="">
        <option value="">

        </option>
      </select>
    </div>
  )

}