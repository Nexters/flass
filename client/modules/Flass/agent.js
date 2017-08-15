import axios from 'axios';

const API_JSON = 'http://localhost:4000';
const API_LOCAL = 'http://localhost:3000';
const API_PRODUCTION = 'https://conduit.productionready.io/api';
const API_ROOT = API_JSON;

const encode = encodeURIComponent;
const responseBody = res => res.data;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const config = {
  headers: {

  },
};

const requests = {
  del: url =>
    axios.delete(`${API_ROOT}${url}`).then(responseBody),
  get: url =>
    axios.get(`${API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    axios.put(`${API_ROOT}${url}`, body).then(responseBody),
  post: (url, body) =>
    axios.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const Auth = {

};

const User = {
  me: () => requests.get('/json/FlassUser.json'),
};

const Badge = {
  byType: type => requests.get('/json/FlassBadgeHistory.json'),
};

const Grid = {
  all: () => requests.get('/json/FlassGrid.json'),
};


const Detail = {
  byId: detailId => requests.get('/json/FlassDetail.json'),

};

const Question = {
  byDetailId: detailId => requests.get('/json/FlassQuestion.json'),
};

const Comment = {
  byDetailId: detailId => requests.get('/json/FlassComment.json'),
  postComment: (detailId, content) => requests.post('/json/FlassPostComment.json', { detailId, content }),

};

const Analysis = {

};

export default {
  Auth,
  User,
  Grid,
  Detail,
  Question,
  Comment,
  Analysis,
  setToken: _token => { token = _token; }
};
