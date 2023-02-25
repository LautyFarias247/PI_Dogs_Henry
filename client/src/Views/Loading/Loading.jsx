import style from "./Loading.module.css"

const Loading = () => {
    return(
        <div className={style.container}>
            <div className={style.lds_ring}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading