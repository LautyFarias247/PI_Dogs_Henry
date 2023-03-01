
import { GET_ALL_DOGS, 
    GET_DOGS_BY_NAME,
    GET_DOG_BY_ID,
    GET_TEMPERAMENTS,
    POST_DOG,
    FILTER_DOGS_BY_TEMPERAMENT,
    FILTER_DOGS_BY_ORIGIN,
    SORT_BY_NAME_OR_WEIGHT,
} from "./actions";

const initialState = {
    dogs: [],
    detail: {},
    temperaments: []
}

const rootReducer = (state=initialState, action) => {
    const allDogs = state.copyDogs
    switch(action.type) {
        case GET_ALL_DOGS:
            const allParsedDogTemp = action.payload.map((dog) => {
                if(dog.created){
                    return {...dog, temperaments: dog.temperaments.map(temp => temp.name)}
                }
                return dog
            })
            return {...state, dogs: allParsedDogTemp, copyDogs: allParsedDogTemp};
        
        case GET_DOGS_BY_NAME:
            const parsedDogs = action.payload.map((dog) => {
                if(dog.created){
                    return {...dog, temperaments: dog.temperaments.map(temp => temp.name)}
                }
                return dog
            })
            return {...state, dogs: parsedDogs};

        case GET_DOG_BY_ID:
            const dogById = action.payload;
            return {...state, detail: dogById}

        case POST_DOG: return{...state}

        case GET_TEMPERAMENTS:
            return {...state, temperaments: action.payload};

        case FILTER_DOGS_BY_TEMPERAMENT:
            const filteredTemp = action.payload === "All"
            ? allDogs
            : allDogs.filter(dog => dog.temperaments.includes(action.payload))
            return {...state, dogs: filteredTemp };
        
        case FILTER_DOGS_BY_ORIGIN:
            const filteredOrigin = action.payload === "Database"
            ? allDogs.filter(dog => dog.created)
            : allDogs.filter(dog => !dog.created)
            return {...state, dogs: action.payload === "All"? allDogs : filteredOrigin}

        case SORT_BY_NAME_OR_WEIGHT:
            let sortedDogs 
                if(action.payload === "A-Z"){
                    sortedDogs = state.dogs.sort(function(a,b){
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                        if(b.name.toLowerCase() > a.name.toLowerCase()) {return -1}
                        return 0
                })}
                if(action.payload === "Z-A"){
                    sortedDogs = state.dogs.sort((a,b) => {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                        if(b.name.toLowerCase() > a.name.toLowerCase()) {return 1}
                        return 0
                })} 
                if(action.payload === "Asc"){
                    sortedDogs = state.dogs.sort((a,b)=>{
                        if(Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])) {return 1}
                        if(Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])) {return -1}
                        return 0
                })}
                if(action.payload === "Des"){
                    sortedDogs = state.dogs.sort(function(a,b){
                       if(Number(a.weight.split("-")[0].trim()) > Number(b.weight.split("-")[0].trim())) {return -1}
                        if(Number(b.weight.split("-")[0].trim()) > Number(a.weight.split("-")[0].trim())) {return 1}
                        return 0
                    })
                }
                else {sortedDogs = state.dogs}
                
            return {...state, dogs: sortedDogs} 

        default:
            return {...state};
    }
}
export default rootReducer