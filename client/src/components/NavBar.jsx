import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.css';
import SearchBar from './SearchBar.jsx';


export default function NavBar() {
  return (
    <nav className={style.nav} >
      <SearchBar />
      <Link to='/home'>
        <h2 className={style.back}>{`<-<-<-`} Go Back </h2>
      </Link>
      <Link to='/form'>
        <h1 className={style.h1}>Create recipes</h1>
      </Link>
    </nav>
  )
}