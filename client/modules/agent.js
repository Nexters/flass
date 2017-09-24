import axios from 'axios';

const TYPE_OF_BACKEND = process.env.BACK_END;
const API_JSON = 'http://localhost:4000';
const API_LOCAL = 'http://localhost:3000';
const API_PRODUCTION = 'http://flass.me';
export const API_ROOT = (function() {
  switch(TYPE_OF_BACKEND) {
    case 'json' :
      return API_JSON;
    case 'local':
      return API_LOCAL;
    default:
      return API_PRODUCTION;
  }
})();

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
  return TYPE_OF_BACKEND === 'json' ?  jsonRequest : railsRequest;
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

const UserJson = {
  me: () => requestsForApi.get('/json/FlassUser.json')
        .then(response => {
          console.log('response::UserJson');
          console.log(response);
          return response;
        })
};
const UserRails = {
  me: token => requestsForApi.post('/users', { id_token: token })
    .then(response => {
      console.log('response::UserRails');
      console.log(response);
      return response;
    }),
  byId: id => requestsForApi.get(`/users/${id}`),
  whoami: () => requestsForApi.get('/users')
    .then(response => {
      console.log('response::UserRails::whoami');
      console.log(response);
      return response;
    }),
  out: () => axios.get(`${API_ROOT}/logout`, config)
    .then(response => {
      console.log('response::out');
      console.log(response);
      return response;
    })
};
const User = selectAPIRequest(UserRails, UserJson);


const Badge = {
  byType: type => requestsForApi.get('/json/FlassBadgeHistory.json')
};

const GridJson = {
  all: () => requestsForApi.get('/json/FlassGrid.json')
};
const GridRails = {
  all: () => requestsForApi.get('/lectures')
};
const Grid = selectAPIRequest(GridRails, GridJson);


const LectureJson = {
  byId: lectureId => requestsForApi.get('/json/FlassLecture.json')
};
const LectureRails = {
  byId: lectureId => requestsForApi.get(`/lectures/${lectureId}`),
  upload: body => requestsForApi.post('/lectures', body)
};
const Lecture = selectAPIRequest(LectureRails, LectureJson);


const QuestionJson = {
  byLectureId: lectureId => requestsForApi.get('/json/FlassQuestion.json')
};
const QuestionRails = {
  byLectureId: lectureId => requestsForApi.get(`/questions?lecture_id=${lectureId}`),
  uploadByLectureId: body => requestsForApi.post('/questions', body)
};
const Question = selectAPIRequest(QuestionRails, QuestionJson);

const Choice = {
  upload: body => requestsForApi.post('/choices', body),
  fetch: questionId => requestsForApi.get(`/choices?question_id=${questionId}`)
};

const CommentJson = {
  byLectureId: lectureId => requestsForApi.get('/json/FlassComment.json'),
  postComment: (lectureId, content) => requestsForApi.get('/json/FlassPostComment.json', { lectureId, content }),
  deleteById: commentId => requestsForApi.del('')
};

const CommentRails = {
  byLectureId: lectureId => requestsForApi.get(`/comments?lecture_id=${lectureId}`),
  postComment: (lectureId, content) => requestsForApi.post('/comments', { lecture_id: lectureId, content }),
  postReplyComment: (commentId, content) => requestsForApi.post('/comment_children', { comment_id: commentId, content }),
  putComment: (commentId, content) => requestsForApi.put('/comments', { id: commentId, content }),
  putReplyComment: (commentId, content) => requestsForApi.put('/comment_children', { id: commentId, content }),
  deleteById: commentId => requestsForApi.del(`/comments?id=${commentId}`),
  deleteReplyById: id => requestsForApi.del('/comment_children', { id })
};

const Comment = selectAPIRequest(CommentRails, CommentJson);

const Like = {
  postByCommentId: commentId => requestsForApi.put(`/comments/${commentId}/like`)
};

const AnswerRails = {
  byLectureId: lectureId => requestsForApi.get(`/answers?lecture_id=${lectureId}`),
  uploadByQuestionId: body => requestsForApi.post('/answers', body),
  getAnswerByQuestionId: questionId => requestsForApi.get(`/answers/question?question_id=${questionId}`)
};
const AnswerJson = {
  byLectureId: () => {},
  uploadByQuestionId: body => axios.post('http://localhost:3000/answers', body, config),
  getAnswerByQuestionId: () => {}
};
const Answer = selectAPIRequest(AnswerRails, AnswerJson);


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
