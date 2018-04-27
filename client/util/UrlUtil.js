import queryString from 'query-string';

export const queryToObject = search => queryString.parse(search);

export const queryToObjectMap = location => queryToObject(location.search);

export const queryToObjectKey = (location, key) => queryToObjectMap(location)[key];

export const hashToObjectMap = location => queryToObject(location.hash);

export const hashToObjectKey = (location, key) => hashToObjectMap(location)[key];
