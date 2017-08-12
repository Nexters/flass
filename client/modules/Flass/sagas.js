import { call, fork, take, select, put, cancel } from 'redux-saga/effects';
import flassUser from './FlassUser/FlassUserActions';
import flassBadge from './FlassBadge/FlassBadgeActions';
import flassGrid from './FlassGrid/FlassGridActions';
import flassDetail from './FlassDetail/FlassDetailActions';
import flassComment from './FlassDetail/Comment/CommentActions';
import flassQuestion from './FlassDetail/Question/QuestionActions';

export default function* rootSaga() {
  yield [
    fork(flassUser),
    fork(flassBadge),
    fork(flassGrid),
    fork(flassDetail),
    fork(flassComment),
    fork(flassQuestion),
  ];
}
