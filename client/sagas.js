import { fork } from 'redux-saga/effects';
import flassSaga from './ducks/Flass/sagas';
import { rootSaga as signSaga } from './ducks/Sign/signs';
import { rootSaga as uploadQuestionSaga } from './ducks/Upload/uploadInsertionQuizzes';
import { rootSaga as uploadSaga } from './ducks/Upload/uploads';

export default function* rootSaga() {
  yield [
    fork(flassSaga),
    fork(signSaga),
    fork(uploadQuestionSaga),
    fork(uploadSaga)
  ];
}
