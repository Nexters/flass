import { fork } from 'redux-saga/effects';
import { rootSaga as user } from './users';
import { rootSaga as badge } from './badges';
import { rootSaga as grid } from './grids';
import { rootSaga as lecture } from './lectures';
import { rootSaga as comment } from './comments';
import { rootSaga as question } from './questions';
import { rootSaga as video } from './videos';
import { rootSaga as analysis } from './analysises';

export default function* rootSaga() {
  yield [
    fork(user),
    fork(badge),
    fork(grid),
    fork(lecture),
    fork(comment),
    fork(question),
    fork(video),
    fork(analysis)
  ];
}
