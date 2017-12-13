import { fork } from 'redux-saga/effects';
import flassSaga from './modules/Flass/sagas';
import { rootSaga as signSaga } from './modules/Sign/signs';
import { rootSaga as uploadQuestionSaga } from './modules/Upload/UploadInsertion/Quiz/quizzes';
import { rootSaga as uploadSaga } from './modules/Upload/uploads';

export default function* rootSaga() {
  yield [
    fork(flassSaga),
    fork(signSaga),
    fork(uploadQuestionSaga),
    fork(uploadSaga)
  ];
}
