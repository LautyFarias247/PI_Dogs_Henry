import axios from "axios";

const GET_ALL_DOGS = "GET_ALL_DOGS";
const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
const GET_DOG_BY_ID = "GET_DOG_BY_ID";
const POST_DOG = "POST_DOG"
const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
const FILTER_DOGS_BY_TEMPERAMENT = "FILTER_DOGS_BY_TEMPERAMENT";
const FILTER_DOGS_BY_ORIGIN = "FILTER_DOGS_BY_ORIGIN";
const SORT_BY_NAME_OR_WEIGHT = "SORT_BY_NAME_OR_WEIGHT";


const getAllDogs = (setLoading) => {
    return async function (dispatch) {
        const allDogs = await axios.get("http://localhost:3001/dogs");
        setLoading(false)
        return dispatch({type: GET_ALL_DOGS, payload:allDogs.data})
    }
}

const getDogsByName = (payload) => {
    return async function (dispatch) {
        const dogsByName = await axios.get(`http://localhost:3001/dogs?name=${payload}`);
        return dispatch({type: GET_DOGS_BY_NAME, payload: dogsByName.data})
    }
}

const getDogById = (id, setLoading) => {
    return async function (dispatch) {
        const dogById = await axios(`http://localhost:3001/dogs/${id}`)
        setLoading(false)
        return dispatch ({type: GET_DOG_BY_ID, payload: dogById.data})
    }
}

const postDog = (payload) => {
    return async function () {
        const newDog = await axios.post("http://localhost:3001/dogs", payload)
        return newDog
    //     try {
    //         const response = await axios.post("http://localhost:3001/dogs)", payload)
    //         return response
    //     } catch (error) {
    //          console.log(error.message); 
    //     }
    }
}

const getTemperaments = () => {
    return async function(dispatch) {
        const temperaments = await axios.get("http://localhost:3001/temperaments")
        
        return dispatch({type: GET_TEMPERAMENTS, payload:temperaments.data})
    }
}

const filterDogsByTemperament = (payload) => {
    return function(dispatch){
        return dispatch({type: FILTER_DOGS_BY_TEMPERAMENT, payload })
    }
}

const filterDogsByOrigin = (payload) => {
    return function(dispatch){
        return dispatch({type: FILTER_DOGS_BY_ORIGIN, payload})
    }
}

const sortByNameOrWeight = (payload) => {
    return function (dispatch){
        return dispatch({type: SORT_BY_NAME_OR_WEIGHT, payload})
    }
}

export { GET_ALL_DOGS, getAllDogs,
        GET_DOGS_BY_NAME, getDogsByName,
        GET_DOG_BY_ID, getDogById,
        POST_DOG, postDog, 
        GET_TEMPERAMENTS, getTemperaments,
        FILTER_DOGS_BY_TEMPERAMENT, filterDogsByTemperament,
        FILTER_DOGS_BY_ORIGIN, filterDogsByOrigin,
        SORT_BY_NAME_OR_WEIGHT, sortByNameOrWeight
    }