const axios = require('axios');
const { create } = require('browser-sync');
const { Dog, Temperament } = require('../db');


const apiUrl = "https://api.thedogapi.com/v1/breeds/";

async function getAllApiData() {

  const apiInfo = await axios.get(`${apiUrl}?api_key=${process.env.API_KEY}`);
  const dataApi = await apiInfo.data.map(d => {

           // const dataApi = dataJson.map(d => {

    return {
      id: d.id,
      name: d.name,
      height: d.height,
      weight: d.weight,
      life_span: d.life_span,
      image: d.image.url,
      temperament: d.temperament,
    }
  })
  const myDb = await Dog.findAll({include: {model: Temperament}});
  const allApiData = [...dataApi, ...myDb];
console.log(allApiData)
  return allApiData;
}

const getAllDogs = async (req, res, next) => {

  // Obtener un listado de las razas de perro
  // Debe devolver solo los datos necesarios para la ruta principal
  
  const name = req.query.name;
  try {
    const dataApi = await getAllApiData();
    if(dataApi.length) {
      ! name 
      ? res.status(200).json({ length: dataApi.length, data: dataApi })
      : res.status(200).json(dataApi.filter(r => r.name.toLowerCase().includes(name.toLowerCase())))
      // res.status(400).send('missing data')
    }
//console.log(dataApi)
    res.status(400).send('missing data');
  } catch (error) {
    return ({error: error.message})
  }
}

const getDogsId = async (req, res, next) => {

  // Obtener el detalle de una raza de perro en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  // Incluir los temperamentos asociados

  const id = req.params.id;
  try {
    const allData = await getAllApiData();
    if(allData.length) {
      return res.status(200).json(allData.filter(i => i.id == id));
    }
//console.log(allData);
    return res.status(400).send('missing data');
  } catch (error) {
    return ({ error: error.message });
  }
}

const createDog = async (req,res, next) => {

  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  // Crea una raza de perro en la base de datos relacionada con sus temperamentos

  const { name, weight, height, life_span, image, tempers, createdInDb } = req.body;
  try {
    if(name) {
      const createdDog = await Dog.findOrCreate({
        where: {
          name: name,
        },
        defaults: { name, weight, height, life_span, image, createdInDb }
      });
      tempers.map(async t => {
        const temper = Temperament.findOne({ where: { name: e } });
        createdDog[0].addTemper(temper);
      });
console.log(createdDog);
      await Temperament.findAll();
      return res.status(200).json({ data: createdDog[1] ? createdDog : 'its was created' })
    }
    return res.status(400).send('missing data')
  } catch (error) {
    return ({ error: error.message });
  }
}


module.exports = {
  //getAllApiData,
  getAllDogs,
  getDogsId,
  createDog
}