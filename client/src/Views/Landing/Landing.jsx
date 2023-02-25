import style from './Landing.module.css'
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className={style.container}>
            <div className={style.image}> 
            </div>
            <div className={style.landing}>
                <p>Welcome to <b>The Dog Club</b></p> 
                <Link to="home"><button>Start</button></Link>
            </div>
        </div>
    )
}

export default Landing