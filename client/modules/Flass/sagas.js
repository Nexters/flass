import { fork } from 'redux-saga/effects';
import flassUser from './User/UserActions';
import flassBadge from './Badge/BadgeActions';
import flassGrid from './Grid/GridActions';
import flassDetail from './Detail/DetailActions';
import flassComment from './Detail/Comment/CommentActions';
import flassQuestion from './Detail/Question/QuestionActions';

export default function* rootSaga() {
  yield [
    fork(flassUser),
    fork(flassBadge),
    fork(flassGrid),
    fork(flassDetail),
    fork(flassComment),
    fork(flassQuestion)
  ];
}
