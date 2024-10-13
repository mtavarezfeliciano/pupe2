import { Dog } from './types';

const baseUrl = 'http://localhost:3000/dogs';

const getAllDogs = () => {
  return fetch(baseUrl).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with ${res.status} status.`);
    }
    return res.json();
  });
};

const postDog = (data: Omit<Dog, 'id'>) => {
  // fill out method
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with ${res.status} status.`);
    }
    return res.json();
  });
};

const deleteDogRequest = (id: number) => {
  // fill out method
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with ${res.status} status.`);
    }
    return res.json();
  });
};

const patchFavoriteForDog = (id: number, isFavorite: boolean) => {
  // fill out method
  return fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isFavorite,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with ${res.status} status.`);
    }
    return res.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
