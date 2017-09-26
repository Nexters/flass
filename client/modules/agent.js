import axios from 'axios';

const TYPE_OF_BACKEND = process.env.BACK_END;
const API_JSON = 'http://localhost:4000';
const API_LOCAL = 'http://localhost:3000';
const API_PRODUCTION = 'http://flass.me';
export const API_ROOT = (function(type) {
  switch(type) {
    case 'local':
      return API_LOCAL;
    default:
      return API_PRODUCTION;
  }
})(TYPE_OF_BACKEND);

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
    Authorization: ''
  },
  withCredentials: true
};

function selectAPIRequest(railsRequest = {}, jsonRequest = {}) {
  return railsRequest;
}

const requestsForApi = {
  del: url =>
    axios.delete(`${API_ROOT}/api${url}`, config).then(responseBody),
  get: url =>
    axios.get(`${API_ROOT}/api${url}`, config).then(responseBody),
  put: (url, body) =>
    axios.put(`${API_ROOT}/api${url}`, body, config).then(responseBody),
  post: (url, body) =>
    axios.post(`${API_ROOT}/api${url}`, body, config).then(responseBody)
};

const requests = {
  del: url =>
    axios.delete(`${API_ROOT}${url}`, config).then(responseBody),
  get: url =>
    axios.get(`${API_ROOT}${url}`, config).then(responseBody),
  put: (url, body) =>
    axios.put(`${API_ROOT}${url}`, body, config).then(responseBody),
  post: (url, body) =>
    axios.post(`${API_ROOT}${url}`, body, config).then(responseBody)
};

const Auth = {};

const User = {
  me: token => requestsForApi.post('/users', { id_token: token }),
  byId: id => requestsForApi.get(`/users/${id}`),
  whoami: () => requestsForApi.get('/users'),
  out: () => axios.get(`${API_ROOT}/logout`, config)
};

const Badge = {
  byType: type => requestsForApi.get('/json/FlassBadgeHistory.json')
};

const Grid = {
  all: () => requestsForApi.get('/lectures')
};

const Lecture = {
  byId: lectureId => requestsForApi.get(`/lectures/${lectureId}`),
  upload: body => requestsForApi.post('/lectures', body),
  delete: lectureId => requestsForApi.del(`/lectures/${lectureId}`)
};

const Question = {
  byLectureId: lectureId => requestsForApi.get(`/questions?lecture_id=${lectureId}`),
  uploadByLectureId: body => requestsForApi.post('/questions', body)
};

const Choice = {
  upload: body => requestsForApi.post('/choices', body),
  fetch: questionId => requestsForApi.get(`/choices?question_id=${questionId}`)
};

const Comment = {
  byLectureId: lectureId => requestsForApi.get(`/comments?lecture_id=${lectureId}`),
  postComment: (lectureId, content) => requestsForApi.post('/comments', { lecture_id: lectureId, content }),
  postReplyComment: (commentId, content) => requestsForApi.post('/comment_children', { comment_id: commentId, content }),
  putComment: (commentId, content) => requestsForApi.put('/comments', { id: commentId, content }),
  putReplyComment: (commentId, content) => requestsForApi.put('/comment_children', { id: commentId, content }),
  deleteById: commentId => requestsForApi.del(`/comments?id=${commentId}`),
  deleteReplyById: id => requestsForApi.del('/comment_children', { id })
};

const Like = {
  postByCommentId: commentId => requestsForApi.put(`/comments/${commentId}/like`)
};

const Answer = {
  byLectureId: lectureId => requestsForApi.get(`/answers?lecture_id=${lectureId}`),
  uploadByQuestionId: body => requestsForApi.post('/answers', body),
  getAnswerByQuestionId: questionId => requestsForApi.get(`/answers/question?question_id=${questionId}`)
};

const Analysis = {
  fetch: lectureId => requestsForApi.get(`/lectures/statistics?id=${lectureId}`)
};

export default {
  Auth,
  Badge,
  User,
  Grid,
  Lecture,
  Question,
  Comment,
  Like,
  Analysis,
  Choice,
  Answer,
  setToken: _token => { token = _token; }
};
