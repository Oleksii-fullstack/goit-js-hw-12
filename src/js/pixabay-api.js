import axios from "axios";
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css"

axios.defaults.baseURL = "https://pixabay.com/api/";

const API_KEY = "50173173-c7ebe87f992e3ee35ae0a4cd8";

export function getImagesByQuery(query) {
  return axios("", {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
    }
  })
    .then(res => res.data)
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
      });
    });
  
  // const BASE_URL = "https://pixabay.com/api/";
  // const API_KEY = "50173173-c7ebe87f992e3ee35ae0a4cd8";

  // const params = new URLSearchParams({
  //   key: API_KEY,
  //   q: query,
  //   image_type: "photo",
  //   orientation: "horizontal",
  //   safesearch: "true",
  // });

  // return fetch(`${BASE_URL}?${params}`)
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error('Wrong request')
  //     }
  //     return res.json();
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     iziToast.error({
  //       title: 'Error',
  //       message: 'Error',
  //   });
  //   });  
}