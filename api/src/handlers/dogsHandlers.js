const {getAlldogs, getDogsByName, createDog, getDogById} = require("../controllers/dogsControllers")


const getDogsHandler = async (req, res) => {
    const {name} = req.query
    const results = name
    ? await getDogsByName(name)
    : await getAlldogs();

    try {
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json(error.message)
    }
};

const getDogByIdHandler = async (req, res) => {
    const { idRaza }  = req.params;
    try {
        const searchCondition = isNaN(idRaza)? 'db':'api'; 
        const dog = await getDogById(idRaza, searchCondition);
        res.status(200).json(dog);
    } catch (error) {
        res.status(404).json(error.message)
    }
};

const createDogHandler = async (req, res) => {
    const { name, image, height, weight, lifespan, temperament, created} = req.body;
    try {
        const newDog =  await createDog(name, image, height, weight, lifespan, temperament, created)
        res.status(200).json(newDog)
    } catch (error) {
        res.status(400).json(error.message)
    }
};

module.exports = {getDogsHandler, createDogHandler, getDogByIdHandler}