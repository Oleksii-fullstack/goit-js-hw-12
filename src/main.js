import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css"

import {getImagesByQuery} from './js/pixabay-api.js';
import {clearGallery, createGallery, hideElement, showElement} from './js/render-functions.js';

const formEl = document.querySelector('.form');
const searchText = formEl.querySelector('input[name="search-text]');
const submitBtn = formEl.querySelector('button');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');
const loadBtn = document.querySelector('.load-more-btn');

let page = 1;
let lastPage = 0;
let searchItems = "";

formEl.addEventListener('submit', fetchOnFormSubmit);
loadBtn.addEventListener('click', loadPagesOnClick);

async function fetchOnFormSubmit(e) {
    e.preventDefault();
    clearGallery();
    searchItems = e.target.elements['search-text'].value.trim();
    page = 1;
    if (searchItems === "") {
        iziToast.warning({
            title: 'Caution',
            message: 'You forgot to type what you search',
        });
        return
    }

    showElement(loader);
    
    try {
        const res = await getImagesByQuery(searchItems, page)
        if (res.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return
        }
        createGallery(res.hits);
        if (res.totalHits <= 15) {
            hideElement(loadBtn);
        }
        else {
            showElement(loadBtn);
        }
        lastPage = Math.ceil(res.totalHits / 15);
    } 
    catch (error) {
        console.log(error)
            iziToast.error({
                message: error.message,
            });
    }
    finally {
            hideElement(loader);
            formEl.reset();
        }
}

async function loadPagesOnClick() {
    page += 1;
    showElement(loaderMore);
    try {
        const res = await getImagesByQuery(searchItems, page)
        
        createGallery(res.hits);
        if (lastPage <= page) {
            hideElement(loadBtn);
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            })
        }
        else {
            showElement(loadBtn);
        }
        const listItemEl = document.querySelector('.gallery-item');
        
        const elementHeight = listItemEl.getBoundingClientRect().height;
        window.scrollBy({
            top: elementHeight * 2,
            behavior: "smooth",
          });
    } 
    catch (error) {
        console.log(error)
            iziToast.error({
                title: 'Error',
                message: 'Illegal operation',
            });
    }
    finally {
            hideElement(loader);
            hideElement(loaderMore);
        }
}