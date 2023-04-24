import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.css';
import SearchBar from './SearchBar.jsx';
import dog from '../images/PERROS (313).gif'
import { useDispatch } from 'react-redux';
import { getDogs } from '../redux/action';
import Filters from "../components/Filters";

export default function NavBar() {
  const dispatch = useDispatch();

  function handlerReset(e) {
    e.preventDefault();
    dispatch(getDogs())
  }

  return (
    <nav className={style.nav} >
      <div className={style.create}>
        <Link to='/form' >
          <button className={style.link}>Create</button>
        </Link>
      </div>
      <div className={style.reset}>
        <Link to='/home'>
          <button className={style.home} onClick={handlerReset} type="submit">
            <img className={style.img} src={dog} alt="" />
          </button>
        </Link>
      </div>
      <div className={style.filters}>
        <Filters />
      </div>
      <div className={style.search}> 
        <SearchBar />
      </div>
    </nav>
  )
}