import axios from 'axios';

const TYPE_OF_BACKEND = process.env.BACK_END;
const API_JSON = 'http://localhost:4000';
const API_LOCAL = 'http://localhost:3000';
const API_PRODUCTION = 'https://conduit.productionready.io/api';
const API_ROOT = (TYPE_OF_BACKEND === 'json' ? API_JSON : API_LOCAL );

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
  return TYPE_OF_BACKEND === 'rails' ? railsRequest : jsonRequest;
}

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

const Auth = {

};

const UserJson = {
  me: () => requests.get('/json/FlassUser.json')
        .then(response => {
          console.log('response::UserJson');
          console.log(response);
          return response;
        })
};
const UserRails = {
  me: token => requests.post('/users', { id_token: token })
    .then(response => {
      console.log('response::UserRails');
      console.log(response);
      return response;
    }),
  byId: id => requests.get(`/users/${id}`),
  whoami: () => requests.get('/users')
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
  byType: type => requests.get('/json/FlassBadgeHistory.json')
};


const GridJson = {
  all: () => requests.get('/json/FlassGrid.json')
};
const GridRails = {
  all: () => requests.get('/lectures')
};
const Grid = selectAPIRequest(GridRails, GridJson);


const DetailJson = {
  byId: detailId => requests.get('/json/FlassDetail.json')
};
const DetailRails = {
  byId: detailId => requests.get(`/lectures/${detailId}`)
};
const Detail = selectAPIRequest(DetailRails, DetailJson);


const QuestionJson = {
  byDetailId: detailId => requests.get('/json/FlassQuestion.json')
};
const QuestionRails = {
  byDetailId: detailId => requests.get(`/questions?lecture_id=${detailId}`),
  uploadByLectureId: body => requests.post('/questions', body)
};
const Question = selectAPIRequest(QuestionRails, QuestionJson);

const Choice = {
  upload: body => requests.post('/choices', body),
  fetch: questionId => requests.get(`/choices?question_id=${questionId}`)
};

const CommentJson = {
  byDetailId: detailId => requests.get('/json/FlassComment.json'),
  postComment: (detailId, content) => requests.get('/json/FlassPostComment.json', { detailId, content }),
  deleteById: commentId => requests.del('')
};

const CommentRails = {
  byDetailId: detailId => requests.get(`/comments?lecture_id=${detailId}`),
  postComment: (detailId, content) => requests.post('/comments', { lecture_id: detailId, content }),
  postReplyComment: (commentId, content) => requests.post('/comment_children', { comment_id: commentId, content }),
  deleteById: commentId => requests.del(`/comments?id=${commentId}`),
  deleteReplyById: id => requests.del('/comment_children', { id })
};

const Comment = selectAPIRequest(CommentRails, CommentJson);

const AnswerRails = {
  byLectureId: lectureId => requests.get(`/answers?lecture_id=${lectureId}`),
  uploadByQuestionId: body => requests.post('/answers', body)
    .then(response => {
      console.log('response::Answer');
      console.log(response);
      return response;
    })
};
const AnswerJson = {
  byLectureId: () => {},
  uploadByQuestionId: body => axios.post('http://localhost:3000/answers', body, config)
    .then(response => {
      console.log('response::Answer');
      console.log(response);
      return response;
    })
};
const Answer = selectAPIRequest(AnswerRails, AnswerJson);


const Analysis = {
  fetch: lectureId => requests.get(`/lectures/statistics?id=${lectureId}`)
};

const Lecture = {
  upload: body => requests.post('/lectures', body)
    .then(response => {
      console.log('response::Lecture::upload');
      console.log(response);
      return response;
    })
};

export default {
  Auth,
  Badge,
  User,
  Grid,
  Detail,
  Question,
  Comment,
  Analysis,
  Choice,
  Answer,
  Lecture,
  setToken: _token => { token = _token; }
};
