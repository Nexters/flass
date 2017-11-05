import queryString from 'query-string';

export const queryToObject = (search) => queryString.parse(search);

export const queryToObjectMap = (location) => {
  return queryToObject(location.search);
};

export const queryToObjectKey = (location, key) => {
  return queryToObjectMap(location)[key];
};

export const hashToObjectMap = (location) => {
  return queryToObject(location.hash);
};

export const hashToObjectKey = (location, key) => {
  return hashToObjectMap(location)[key];
};
