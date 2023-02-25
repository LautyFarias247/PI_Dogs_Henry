import { Link } from "react-router-dom"
import Options from "../Options/Options"
import style from "./Navbar.module.css"
import SearchBar from "../SearchBar/SearchBar"

const Navbar = ({setOrder, setCurrentPage}) => {

    return (
        <nav className={style.nav}>
            <ul>
                <li><Link to="home" onClick={()=>setCurrentPage(1)}>Home</Link> </li>
                <li><Link to="create">Create</Link></li>
            </ul>
            <Options setOrder={setOrder} setCurrentPage={setCurrentPage}/>
            <SearchBar setCurrentPage={setCurrentPage}/>
        </nav>
    )
}

export default Navbar