import { fork } from 'redux-saga/effects';
import flassUser from './User/sagas';
import flassBadge from './Badge/sagas';
import flassGrid from './Grid/sagas';
import flassLecture from './Lecture/sagas';
import flassComment from './Lecture/Comment/sagas';
import flassQuestion from './Lecture/Question/sagas';
import flassVideo from './Lecture/Video/sagas';
import flassAnalysis from './Lecture/Analysis/sagas';

export default function* rootSaga() {
  yield [
    fork(flassUser),
    fork(flassBadge),
    fork(flassGrid),
    fork(flassLecture),
    fork(flassComment),
    fork(flassQuestion),
    fork(flassVideo),
    fork(flassAnalysis)
  ];
}
