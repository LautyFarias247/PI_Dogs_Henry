import style from "./SearchBar.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDogsByName } from "../../Redux/actions"

const SearchBar = ({setCurrentPage}) => {
    
    const dispatch = useDispatch();
    const [dogs, setDogs] = useState("")
    const handleChange = (e) => {
        setDogs(e.target.value)
    }
    const handleSubmit = () => {
        dispatch(getDogsByName(dogs))
        setCurrentPage(1)
        // setDogs("")
    }

    return (
        <div>
            <input type="text" placeholder="Search by name" onChange={(e)=>{handleChange(e)}} value={dogs}/>
            <button className={style.button} type="submit" onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default SearchBar