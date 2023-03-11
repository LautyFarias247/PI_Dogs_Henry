const { Router } = require('express');
const { getDogsHandler, createDogHandler, getDogByIdHandler } = require("../handlers/dogsHandlers")

const dogsRouter = Router();

dogsRouter.get('/', getDogsHandler);

dogsRouter.get('/:idRaza', getDogByIdHandler );

dogsRouter.post('/', createDogHandler);

module.exports = {dogsRouter}