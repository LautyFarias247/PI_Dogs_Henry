import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDogById } from "../../Redux/actions";
import style from "./Detail.module.css";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const Detail = (props) => {
    const myDog = useSelector(state => state.detail)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(()=>{

        dispatch(getDogById(props.match.params.id, setLoading));
    }, [])

    return (
        <>
        {loading && <Loading/>}
        {!loading && <div className={style.mainContainer}>
            <Link to="/home">Back to home</Link>
        <div className={style.container}>
            <h2>{myDog.name}</h2>
            <img src={myDog.image} alt={myDog.name} />
            <div className={style.data}>
                <div>
                    <p>Lifespan: {myDog.lifespan}</p>
                    <p>Height: {myDog.height} cm.</p>
                    <p>Weight: {myDog.weight} kg.</p>
                </div>
                <div>
                    <p>Temperaments</p>
                    {myDog.created? myDog.temperaments.map((temp, i)=>{
                        return(
                            <span key={i}>{temp.name} </span>
                            )
                        }):myDog.temperaments? myDog.temperaments.map((temp, i)=>{
                            return(
                                <span key={i}>{temp} </span>
                                )
                            }):""}
                </div>
            </div>
        </div>
        </div>}
        </>
    )
}

export default Detail