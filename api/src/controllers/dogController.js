const axios = require('axios');
const { Dog, Temperament } = require('../db');
//const jsonApi = require('../../jsonApi.json');

const apiUrl = "https://api.thedogapi.com/v1/breeds/";

async function getAllApiData() {

  const apiInfo = await axios.get(`${apiUrl}?api_key=${process.env.API_KEY}`);
  const dataApi = await apiInfo.data.map(d => {

           // const dataApi = dataJson.map(d => {
    
  /* const heightArr = [];
  if(d.height) {
    heightArr = d.height.metric.slice(0, 2).split(' - ');
    heightArr.push(d.height.metric.split(' - '));
  } */

  /* const heightArr = d.height.metric;
  const heightFiltred = []
  if(heightArr.length) {
    const max = [...heightArr].join("").split("-")[1]//.trim();
    const min = [...heightArr].join("").split("-")[0]//.trim();
    heightFiltred.push([min, max])
    return [min, max]; 
  }
 */
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
    }
  })
  const myDb = await Dog.findAll({include: {model: Temperament}});
  const allApiData = [...dataApi, ...myDb];
//console.log(allApiData)
  return allApiData;
}


const getAllDogs = async (req, res, next) => {

  // Obtener un listado de las razas de perro
  // Debe devolver solo los datos necesarios para la ruta principal
  
  const name = req.query.name;
  //try {
    const dataApi = await getAllApiData();
    //if(dataApi.length) {
      ! name 
      ? res.status(200).json({ length: dataApi.length, data: dataApi })
      : res.status(200).json(dataApi.filter(r => r.name.toLowerCase().includes(name.toLowerCase())))
      // res.status(400).send('missing data')
   // }
//console.log(dataApi)
   /*  res.status(400).send('missing data');
  } catch (error) {
    return ({error: error.message})
  } */
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


const createDog = async (req, res, next) => {

  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  // Crea una raza de perro en la base de datos relacionada con sus temperamentos

//console.log(req.body.temperaments)
 /* const [input, setInput] = useState({
    name: "",
    image: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    temperaments: []
  }) */
  const { name, weightMin, weightMax, heightMin, heightMax, life_span, image, temperaments } = req.body;
  try {
    if(name && weightMin && weightMax && heightMin && heightMax) {
      const dogCreated = await Dog.findOrCreate({ 
        where: { 
        name: name, 
        },
        defaults: { name, weightMin, weightMax, heightMin, heightMax, life_span, image } 
     }); 
      temperaments?.map(async t => {
        const temper = await Temperament.findOne({ where: { name: t } });
        dogCreated[0].addTemperament(temper);  
console.log(`hola ..${dogCreated[0]}`)
      });
console.log(dogCreated[0]);  
      await Temperament.findAll();
      return res.status(200).json({ data: dogCreated[1] ? dogCreated : 'its was created!' })
    }
   res.status(400).send('name is required')
  } catch (error){
   res.json(error)
  }
    //
 
  
}


module.exports = {
  //getAllApiData,
  getAllDogs,
  getDogsId,
  createDog
}