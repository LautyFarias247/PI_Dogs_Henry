import style from "./Card.module.css"
import { Link } from "react-router-dom"

const Card = (props) => {
    return (
        <div className={style.container}>
           
            <div className={style.presentation}>
                <p className={style.name}>{props.name}</p>
            <Link to={`/detail/${props.id}`}>
                <img src={props.image} alt={props.name}/>
            </Link> 
                <p className={style.weight}>Weight: {props.weight} kg.</p>
                <p className={style.weight}>Lifespan: {props.lifespan}</p>
            </div>
             <div className={style.temperament}>
                <span>{props.temperament}</span>
            </div>
    </div>
    )
}

export default Card