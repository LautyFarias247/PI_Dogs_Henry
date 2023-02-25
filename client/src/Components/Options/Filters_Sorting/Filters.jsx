import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { filterDogsByOrigin, filterDogsByTemperament } from "../../../Redux/actions";

const Filters = ({setCurrentPage}) => {
    const temperaments = useSelector(state => state.temperaments);

    const [temp, setTemp] = useState("")
    const [origin, setOrigin] = useState("")

    const dispatch = useDispatch()
    
    const handleFilterTemperament = (e) =>{
        setTemp(e)
        dispatch(filterDogsByTemperament(e));
        setCurrentPage(1)
    }
    const handleFilterOrigin = (e) => {
        setOrigin(e)
        dispatch(filterDogsByOrigin(e))
        setCurrentPage(1)
    }
    
    return (
        <>
            <select onChange={(e)=>{handleFilterTemperament(e.target.value); setOrigin("All")}} value={temp}>
                <option value="All">All</option>
                {temperaments.map((temp, i) => {
                    return (
                        <option value={temp} key={i}>{temp}</option>
                        )
                    })}
            </select>

            <select onChange={(e)=>{handleFilterOrigin(e.target.value); setTemp("All")}} value={origin} >
                <option value="All">All</option>
                <option value="Database">Database</option>
                <option value="Api">Api</option>
            </select>
        </>
    )
}

export default Filters