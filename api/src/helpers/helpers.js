const { Dog, Temperament } = require('../db');
const axios = require("axios")

const filterData = (data) => data.map(
    dog => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            weight: dog.weight.metric.includes("NaN")? "0":dog.weight.metric,
            height: dog.height.metric,
            lifespan: dog.life_span,
            temperaments:dog.temperament
                ?dog.temperament.split(", ")
                :[],
            created: false
        }
    }
)

const parseTemperaments = (dbDogs) =>{
    return dbDogs.map((dog) => {
        return {
            ...dog,
            temperaments: dog.temperaments.map(temp => temp.name)
        }
    })
}

const getApiData = async () => {
    const rawApiData = await axios.get("https://api.thedogapi.com/v1/breeds");
    return filterData(rawApiData.data);
}

const getDbData = async () => {
    const dbData = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }  
        }
    })
    // return parseTempertament(dbData)
    return dbData
}




module.exports = {filterData, getApiData, getDbData, parseTemperaments}