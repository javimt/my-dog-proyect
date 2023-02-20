import axios from "axios";

/* export const cases = {
  get_Dogs: "GET_DOGS"
  
} */

export const getDogs = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/dogs");
//console.log(response.data.data);
    return dispatch({
      type: "GET_DOGS",
      payload: response.data.data,
    })
  };
};

export const getDogsByName = (name) => {
//console.log("name:", name)
  return {
    type: "GET_DOGS_BY_NAME",
    payload: name
  }
};

export const getDetail = (id) => {
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
//console.log(response.data)
    return dispatch({
      type: "GET_DETAIL",
      payload: response.data
    })
    } catch (error) {
      return ({error: error.message})
    }
  }
}

export const getTemperaments = () => {
  return async function(dispatch) {
    const response = await axios.get("http://localhost:3001/tempers");
//console.log(response.data)
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: response.data
    })
  }
}

export const createDogs = async (payload) => {
  const dogCreate = await axios.post("http://localhost:3001/dogs", payload)
  return dogCreate.data
}

export const deleteDog = (id) => {
  const deleteDog = axios.delete(`http://localhost:3001/dogs/${id}`)
}

export const updateDog = (object, id) => {
  const data = axios.put(`http://localhost:3001/dogs/${'?id=', id}`,object)
  data.then(response => console.log("updated"))
}
//========================>> FILTERS <<=========================\\

// Botones/Opciones para filtrar por:
// Temperamento
// Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)

export const filterByTemperaments = (payload) => {
  return {
    type: "FILTER_BY_TEMPERAMENTS",
    payload,
  }
}

export const filterDogsByApi = (payload) => {
//console.log(payload)
  return {
    type: "FILTER_DOGS_BY_API",
    payload: payload
  }
}
//======================>> END FILTERS <<=========================\\


//========================>> SORT BY ASC AND DESC <<==========================\\

// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
// Orden alfabético
// Peso

export const sortByWeight = (payload) => {
  return {
    type: "SORT_BY_WEIGHT",
    payload
  }
}

export const sortByName = (payload) => {
  return {
    type: "SORT_BY_NAME",
    payload
  }
}
//========================>> END SORT BY ASC AND DESC <<==========================\\


//========================>> PAGINATED <<==========================\\

export const changePage = (payload) => {
  return {
    type: "CHANGE_PAGE",
    payload
  }
}

//========================>> END PAGINATED <<=========================\\

