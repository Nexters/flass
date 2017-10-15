const TYPE_OF_BACKEND = process.env.BACK_END;
const API_JSON = 'http://localhost:4000';
const API_LOCAL = 'http://localhost:3000';
const API_PRODUCTION = 'http://flass.me';

export const isDevelop = () => TYPE_OF_BACKEND == 'local';

export const API_ROOT = (function(type) {
  switch(type) {
    case 'local':
      return API_LOCAL;
    default:
      return API_PRODUCTION;
  }
})(TYPE_OF_BACKEND);

export const API_ROOT_FRONT = (function(type) {
  switch(type) {
    case 'local':
      return API_JSON;
    default:
      return API_PRODUCTION;
  }
})(TYPE_OF_BACKEND);
