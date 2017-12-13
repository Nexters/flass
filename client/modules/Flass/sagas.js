import { fork } from 'redux-saga/effects';
import { rootSaga as user } from './User/users';
import { rootSaga as badge } from './Badge/badges';
import { rootSaga as grid } from './Grid/grids';
import { rootSaga as lecture } from './Lecture/lectures';
import { rootSaga as comment } from './Lecture/Comment/comments';
import { rootSaga as question } from './Lecture/Question/questions';
import { rootSaga as video } from './Lecture/Video/videos';
import { rootSaga as analysis } from './Lecture/Analysis/analysises';

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
