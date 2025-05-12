import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css"

import {getImagesByQuery} from './js/pixabay-api.js';
import {clearGallery, createGallery, hideLoader, showLoader} from './js/render-functions.js';

const formEl = document.querySelector('.form');
const searchText = formEl.querySelector('input[name="search-text]');
const submitBtn = formEl.querySelector('button');
const loader = document.querySelector('.loader');

formEl.addEventListener('submit', fetchOnFormSubmit);

function fetchOnFormSubmit(e) {
    e.preventDefault();
    clearGallery();
    const searchItems = e.target.elements['search-text'].value.trim();
    if (searchItems === "") {
        iziToast.warning({
            title: 'Caution',
            message: 'You forgot to type what you search',
        });
        return
    }
    showLoader(loader);
    getImagesByQuery(searchItems)
        .then((res) => {
            if (res.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
                return
            }
            createGallery(res.hits)
        })
        .catch(error => {
            console.log(error)
            iziToast.error({
                title: 'Error',
                message: 'Illegal operation',
            });
        })
        .finally(() => {
            hideLoader(loader);
            formEl.reset();
        });
}
