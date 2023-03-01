import style from "./SearchBar.module.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getDogsByName } from "../../Redux/actions"
import  useLocalStorage  from "../../useLocalStorage"

const SearchBar = ({setCurrentPage}) => {
    
    const dispatch = useDispatch();
    const [dogs, setDogs] = useLocalStorage("text", "")
        
   
        
    useEffect(()=>{
        dispatch(getDogsByName(dogs))  
    },[])
    
    const handleSubmit = () => {
        dispatch(getDogsByName(dogs))
        setCurrentPage(1)
        // setDogs("")
    }

    return (
        <div>
            <input type="text" placeholder="Search by name" onChange={(e)=>{setDogs(e.target.value)}} value={dogs}/>
            <button className={style.button} type="submit" onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default SearchBar