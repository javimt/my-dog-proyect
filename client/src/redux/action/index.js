import axios from 'axios';

export const getDogs = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/dogs");
console.log(response.data.data);
    return dispatch({
      type: "GET_DOGS",
      payload: response. data.data,
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
//console.log(response.data)
      return dispatch({
        type: "GET_DETAIL",
        payload: response.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}