const {getApiData, getDbData} = require('../helpers/helpers')
const {Dog, Temperament} = require("../db")

const getAlldogs = async () => {
    const apiDogs = await getApiData();
    const dbDogs = await getDbData();
    return [...dbDogs, ...apiDogs]
};

const getDogsByName = async (name) => {
    const allDogs = await getAlldogs()
    return allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
};

const getDogById = async (idRaza, condition) => {
    if(condition === "api") {
        const apiData = await getApiData();
        return apiData.find(dog => dog.id === Number(idRaza))
    }
    return Dog.findByPk(idRaza, {
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

const createDog = async (name, image, height, weight, lifespan, temperament, created) => {
    const newDog = await Dog.create({
        name,
        image,
        height,
        weight,
        lifespan: `${lifespan} ${lifespan > 1 ? "years" : "year"}`,
        created
    });
    const temperamentsDB = await Temperament.findAll({
        where: {name: temperament}
    })

    await newDog.addTemperament(temperamentsDB)
    return newDog
};

module.exports = {getAlldogs, getDogsByName, createDog, getDogById}