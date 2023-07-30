import axios from 'axios';
const loader = document.querySelector('.loader');
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_nzdubPeONlGVl79RMOfalDti3pTROMTtpLxDRMMWOB63FcpCaothXWQIz0SbX02F';

export function fetchBreeds() {
  loader.classList.remove('is-hidden');
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  loader.classList.remove('is-hidden');
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    });
}
