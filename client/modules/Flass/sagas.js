import { fork } from 'redux-saga/effects';
import flassUser from './User/sagas';
import flassBadge from './Badge/sagas';
import flassGrid from './Grid/sagas';
import flassDetail from './Detail/sagas';
import flassComment from './Detail/Comment/sagas';
import flassQuestion from './Detail/Question/sagas';
import flassVideo from './Detail/Video/sagas';
import flassAnalysis from './Detail/Analysis/sagas';

export default function* rootSaga() {
  yield [
    fork(flassUser),
    fork(flassBadge),
    fork(flassGrid),
    fork(flassDetail),
    fork(flassComment),
    fork(flassQuestion),
    fork(flassVideo),
    fork(flassAnalysis)
  ];
}
