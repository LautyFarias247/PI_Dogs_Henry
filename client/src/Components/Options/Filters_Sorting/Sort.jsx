import { useDispatch } from "react-redux"
import { sortByNameOrWeight } from "../../../Redux/actions"

const Sort = ({setOrder, setCurrentPage}) => {
    const dispatch = useDispatch()
    const handleSort = (e) =>{
        dispatch(sortByNameOrWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Sorted by ${e.target.value}`)
    }
    return (
        <select onChange={e=> handleSort(e)}>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Des">Descendent min weight</option>
            <option value="Asc">Ascendent min weight</option>
        </select>
    )
}

export default Sort