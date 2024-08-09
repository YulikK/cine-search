import { HttpResponse, http } from 'msw';

import {
  DEFAULT_MOVIE_LIST,
  URL_API,
  URL_SEARCH_API,
} from '../../../common/constant';

export const testMovieList = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
      genre_ids: [18, 80],
      id: 278,
      original_language: 'en',
      original_title: 'The Shawshank Redemption',
      overview:
        'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
      popularity: 159.693,
      poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
      release_date: '1994-09-23',
      title: 'The Shawshank Redemption',
      video: false,
      vote_average: 8.706,
      vote_count: 26485,
    },
    {
      adult: false,
      backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
      genre_ids: [18, 80],
      id: 238,
      original_language: 'en',
      original_title: 'The Godfather',
      overview:
        'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
      popularity: 147.498,
      poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      release_date: '1972-03-14',
      title: 'The Godfather',
      video: false,
      vote_average: 8.7,
      vote_count: 20105,
    },
  ],
  total_pages: 476,
  total_results: 9515,
};
const handlers = [
  http.get(`${URL_API}/${DEFAULT_MOVIE_LIST}`, () =>
    HttpResponse.json(testMovieList)
  ),
  http.get(`${URL_SEARCH_API}`, () => HttpResponse.json(testMovieList)),
];

export default handlers;
