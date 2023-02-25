import Filters from "./Filters_Sorting/Filters"
import Sort from "./Filters_Sorting/Sort"
import style from "./Options.module.css"

const Options = ({setOrder, setCurrentPage}) => {
    return (
        <div className={style.options}>
            <Filters setCurrentPage={setCurrentPage}/>
            <Sort setCurrentPage={setCurrentPage} setOrder={setOrder}/>
        </div>
    )    
}

export default Options