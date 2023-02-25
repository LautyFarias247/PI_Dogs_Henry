import style from "./Pagination.module.css"

const Pagination = ({totalDogs, dogsPerPage, setCurrentPage}) => {
    const pages = []
    
    for (let i = 1; i <= Math.ceil(totalDogs/dogsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className={style.buttonContainer}>
            {pages.map((page) =>{
                return (
                   <button key={page} onClick={() => {setCurrentPage(page);window.scrollTo(0, 0)}}>{page}</button>
                )
            })}
        </div>
    )
}

export default Pagination