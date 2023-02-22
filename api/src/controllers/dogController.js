const axios = require('axios');
const { Dog, Temperament, temperDog } = require('../db');
//const jsonApi = require('../../jsonApi.json');

const apiUrl = "https://api.thedogapi.com/v1/breeds/";

async function getAllApiData() {

  const apiInfo = await axios.get(`${apiUrl}?api_key=${process.env.API_KEY}`);
  const dataApi = await apiInfo.data.map(d => {

           // const dataApi = dataJson.map(d => {

    return {
      id: d.id,
      name: d.name, 
      heightMin: [...d.height.metric.split(" - ")][0].replace("NaN", "0"),
      heightMax: d.height.metric.split(" - ")[1],
      weightMin: [...d.weight.metric.split(" - ")][0].replace("NaN", "0"),
      weightMax: d.weight.metric.split(" - ")[1],
      image: d.image.url,
      temperament: d.temperament,
    }
  })
  const myDb = await Dog.findAll({include: {model: Temperament}});
  const allApiData = [...dataApi, ...myDb];
  return allApiData;
}


const getAllDogs = async (req, res, next) => {

  // Obtener un listado de las razas de perro
  // Debe devolver solo los datos necesarios para la ruta principal
  try {
    const {name} = req.query;
  const dataApi = await getAllApiData();
    ! name 
    ? res.status(200).json({ length: dataApi.length, data: dataApi })
    : res.status(200).json(dataApi.filter(r => r.name.toLowerCase().includes(name.toLowerCase())))
  } catch (error) {
    return res.status(400).send({error: error.message})
  }   
}


const getDogsId = async (req, res, next) => {

  // Obtener el detalle de una raza de perro en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  // Incluir los temperamentos asociados

  const {id} = req.params;
  try {
    const allData = await getAllApiData();
    if(allData.length) {
      return res.status(200).json(allData.filter(i => i.id == id ));
    }
    return res.status(400).send('missing data');
  } catch (error) {
    return ({ error: error.message });
  }
}


const createDog = async (req, res, next) => {

  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  // Crea una raza de perro en la base de datos relacionada con sus temperamentos

  const { name, weightMin, weightMax, heightMin, heightMax, life_span, image, temperaments } = req.body;
  try {
    if(name && weightMin && weightMax && heightMin && heightMax) {
      const dogCreated = await Dog.findOrCreate({ 
        where: { 
        name: name, 
        },
        defaults: { name, weightMin, weightMax, heightMin, heightMax, life_span, image } 
     }); 
     if(dogCreated[1]) {
      temperaments?.map(async t => {
        const temper = await Temperament.findOne({ where: { name: t } });
        dogCreated[0].addTemperament(temper); 
      });
     }
      await Temperament.findAll();
      return res.status(200).json( dogCreated[1] ? dogCreated : 'its was created!' )
    }
   res.status(400).send('name is required')
  } catch (error){
   return res.send({error: error.message})  
  }
}


const deleteDog = async (req, res, next) => {
  const id = req.params.id; 
  try {
    Dog.destroy({where: {id: id}});
    let dataApi = await getAllApiData();
    let dataDb = await Dog.findAll({include: Temperament});
    dataDb = await dataDb.map(e => {
      return {
        id: e.id,
        name: e.name,
        heightMin: e.heightMin, 
        heightMax: e.heightMax,
        weightMin: e.weightMin,
        weightMax: e.weightMax,
        life_span: e.life_span,
        image: e.image,
        temperaments: e.temperaments.map(t => t.name).join(",")
      }
    })
    let allApiData = [...dataApi, ...dataDb];
    res.status(200).json(allApiData);
  } catch(error) {
    return ({error: error.message})
  }
}


const updateDog = async (req, res, next) => {
  const id = req.params.id;
  const { temperaments } = req.body
  try {
    const dogUpdated = await Dog.update(req.body, {
      where: {
        id: id
      }
    })
    const updatedDog = await Dog.findAll({where: {id:id}});
//console.log(updatedDog.dataValues)
    if(temperaments.length)await temperDog.destroy({where: {DogId: id}})
    if(dogUpdated) {
      temperaments?.map(async t => {
        const temper = await Temperament.findOne({ where: { name: t } });
        updatedDog[0].addTemperament(temper); 
      });
    }
    dogUpdated.length ?
    res.status(200).json(await temperDog.findAll({})) :
    res.status(400).send('missing data')
  } catch (error) {
    return ({error: error.message})
  }
}

module.exports = {
  getAllDogs,
  getDogsId,
  createDog,
  deleteDog,
  updateDog,
}