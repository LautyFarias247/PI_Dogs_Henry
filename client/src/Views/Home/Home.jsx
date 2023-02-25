import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getTemperaments } from "../../Redux/actions";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import Pagination from "../../Components/Pagination/Pagination";
import Navbar from "../../Components/Navbar/Navbar"
import Loading from "../Loading/Loading";

const Home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs)
    const dogsPerPage = 8
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState("");
    const lastDogIndex = currentPage * dogsPerPage;
    const firstDogIndex = lastDogIndex - dogsPerPage;
    const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex)
    

    useEffect(()=>{
        dispatch( getAllDogs(setLoading))
        dispatch( getTemperaments())
    },[])

    
    return (
    
        <>
            {loading && <Loading/>}
            {!loading && <Navbar setCurrentPage={setCurrentPage} setOrder={setOrder}/>}
            {!loading &&<CardsContainer slicedDogs={currentDogs}/>}
            {!loading && <Pagination totalDogs={allDogs.length} dogsPerPage={dogsPerPage} setCurrentPage={setCurrentPage}/>}
        </>
    )
}

export default Home