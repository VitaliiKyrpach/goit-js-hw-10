import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
const catCard = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
errorMessage.hidden = true;
select.hidden = true;

fetchBreeds()
  .then(data => {
    loader.classList.add('is-hidden');
    select.hidden = false;
    select.insertAdjacentHTML('beforeend', createSelectMarkup(data));
    new SlimSelect({
      select: '.breed-select',
      settings: {
        placeholderText: 'Select a cat',
      },
    });
  })
  .catch(error => {
    loader.classList.add('is-hidden');
    Notify.failure(errorMessage.textContent);
    console.log(error);
  });

function createSelectMarkup(arr) {
  return (
    `<option data-placeholder="true"></option>` +
    arr.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')
  );
}
select.addEventListener('change', onChange);
function onChange() {
  catCard.classList.add('is-hidden');
  fetchCatByBreed(select.value)
    .then(catInfo => {
      loader.classList.add('is-hidden');
      catCard.classList.remove('is-hidden');
      catCard.innerHTML = createMarkup(catInfo);
    })
    .catch(error => {
      loader.classList.add('is-hidden');
      Notify.failure(errorMessage.textContent);
      console.log(error);
    });
}

function createMarkup(infoArr) {
  return `<img src="${infoArr.url}" alt="${infoArr.breeds[0].name}" width="500"/><div><h2>${infoArr.breeds[0].name}</h2><p style='width:400px'>${infoArr.breeds[0].description}</p><p><b>Temperament:</b> ${infoArr.breeds[0].temperament}</p></div>`;
}
