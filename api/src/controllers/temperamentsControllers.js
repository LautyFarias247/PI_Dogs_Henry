const { Temperament } = require("../db")
const { getApiData } = require("../helpers/helpers")

const getTemperaments = async() => {
    const apiData = await getApiData();
    const allRawTemperaments = apiData.map(dog => dog.temperaments)
    allRawTemperaments.forEach(arr => {
        arr.forEach(temp => {
            Temperament.findOrCreate({
                where: {name: temp}
            })
        })
    });
    const allTemperaments = await Temperament.findAll()
    return allTemperaments.map(temp => temp.name).sort()
}
module.exports = {getTemperaments}