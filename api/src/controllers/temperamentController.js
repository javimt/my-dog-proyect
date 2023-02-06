const axios = require('axios');
const { Dog, Temperament } = require('../db');
// const dataApi = require('../../jsonApi.json')

const apiUrl = "https://api.thedogapi.com/v1/breeds/";

async function getAllApiTemperaments() {
  const apiInfo = await axios.get(`${apiUrl}?api_key=${process.env.API_KEY}`);
  const dataApi = await apiInfo.data.map((d) => {
    
      // const dataApi = dataJson.map(d => {

    return {
      id: d.id,
      name: d.name,
      heightMin: d.height.metric.split(" - ")[0],// d.height.metric.split(" - ")[1]],// [d.height.metric],  //heightFiltred.trim(),
      heightMax: d.height.metric.split(" - ")[1],
      weightMin: d.weight.metric.split(" - ")[0],//[`weightMin: ${d.weight.metric.split(" - ")[0]}, weightMax: ${d.weight.metric.split(" - ")[1]}`],
      weightMax: d.weight.metric.split(" - ")[1],
      life_span: d.life_span,
      image: d.image.url,
      temperament: d.temperament,
    };
  });
  const myDb = await Dog.findAll({ include: { model: Temperament } });
  const allApiData = [...dataApi, ...myDb];
//console.log(allApiData);
  return allApiData;
}

const getAllTemperaments = async (req, res, next) => {

  // Obtener todos los temperamentos posibles
  // En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego
  // ya utilizarlos desde allí

  try {
    const allTemperaments = await Temperament.findAll();
    if(!allTemperaments.length) {
      try {
        const response = await getAllApiTemperaments();
        const allTempers = response.map(t => t.temperament);
        const temperaments = allTempers.map(e => e).join(', ')//.split(',')//.trim();
        const tempers = temperaments.split(', ').filter(e => {
          if(e !== '')return e.trim()
        })
        const temperSet = new Set([...tempers]);
        const temperObj = [...temperSet].map(e => new Object({name: e}));
        temperObj.map(async e => await Temperament.findOrCreate({ 
          where: {name: e.name},
        }));
console.log(temperObj);
        await Temperament.bulkCreate(temperSet);
        return res.status(200).json(await Temperament.findAll());
  
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    }
    return res.status(200).json(allTemperaments)
  } catch (error) {
    return ({ error: error.message })
  }

}

module.exports = {
  //getAllApiTemperaments,
  getAllTemperaments,
}