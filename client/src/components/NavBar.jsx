import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.css';
import SearchBar from './SearchBar.jsx';
import dog from '../images/PERROS (313).gif'

export default function NavBar() {
  return (
    <nav className={style.nav} >
      <div className={style.create}>
        <Link to='/form' >
          <button className={style.link}>Create</button>
        </Link>
      </div>
      <div className={style.dog}>
        <img className={style.img} src={dog} alt="" />
      </div>
      <div className={style.search}>
        <SearchBar />
      </div>
    </nav>
  )
}