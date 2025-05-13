import axios from "axios";
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css"

axios.defaults.baseURL = "https://pixabay.com/api/";

const API_KEY = "50173173-c7ebe87f992e3ee35ae0a4cd8";

export async function getImagesByQuery(query, page) {
  try {
    const { data } = await axios("", {
      params: {
        key: API_KEY,
        q: query,
        page,
        per_page: "15",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
      }
    });
    return data;
  }
  catch (error) {
    console.log(error);
      iziToast.error({
        title: 'Error',
      });
  } 
}