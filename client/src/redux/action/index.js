import axios from "axios";

export const getDogs = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: response.data.data,
    })
  };
};

export const getDogsByName = (name) => {
  return {
    type: "GET_DOGS_BY_NAME",
    payload: name
  }
};

export const getDetail = (id) => {
  return async function(dispatch) {
    try { 
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
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
  axios.delete(`http://localhost:3001/dogs/${id}`)
}

export const updateDog = (object, id) => {
  // eslint-disable-next-line no-sequences
  const data = axios.put(`http://localhost:3001/dogs/${'?id=', id}`,object)
  data.then(response => console.log("Dog updated"))
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

