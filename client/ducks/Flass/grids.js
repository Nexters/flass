import { all, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { createReducer } from '../reducerHelper';
import { dateTimeFormat } from '~/util/TimeUtil';
import logger from '~/util/LogUtil';
import agent from '../agent';

export const FETCH_MY_CHANNEL = 'FETCH_MY_CHANNEL';
export const FETCH_READY_MY_CHANNEL = 'FETCH_READY_MY_CHANNEL';
export const FETCH_MY_CHANNEL_SUCCESS = 'FETCH_MY_CHANNEL_SUCCESS';
export const FETCH_MY_CHANNEL_ERROR = 'FETCH_MY_CHANNEL_ERROR';

export const DELETE_MY_CHANNEL_ITEM = 'DELETE_MY_CHANNEL_ITEM';
export const DELETE_READY_MY_CHANNEL_ITEM = 'DELETE_READY_MY_CHANNEL_ITEM';
export const DELETE_MY_CHANNEL_ITEM_SUCCESS = 'DELETE_MY_CHANNEL_ITEM_SUCCESS';
export const DELETE_MY_CHANNEL_ITEM_ERROR = 'DELETE_MY_CHANNEL_ITEM_ERROR';
export const DELETE_MY_CHANNEL_ITEM_FIN = 'DELETE_MY_CHANNEL_ITEM_FIN';

const initialState = {
  items: [],
  isDeletedItem: false,
  isFetched: false
};

const fetchItemReducer = {
  [FETCH_MY_CHANNEL_SUCCESS]: (state, action) => ({
    ...state,
    items: [...action.items.map(item => ({
      id: item.id,
      userId: item['user_id'],
      title: item.title,
      subject: item.subject,
      content: item.content,
      textbookRange: item['textbook_range'],
      url: item.url,
      thumbnailUrl: item['thumbnail_url'],
      duration: item.duration,
      createdAt: dateTimeFormat(item['created_at']),
      updatedAt: dateTimeFormat(item['updated_at']),
      questionCount: item.questionCount
    }))],
    isFetched: true
  }),
  [FETCH_MY_CHANNEL_ERROR]: state => ({ ...state, initialState })
};

const deleteItemReducer = {
  [DELETE_READY_MY_CHANNEL_ITEM]: state => ({
    ...state,
    isDeletedItem: false
  }),
  [DELETE_MY_CHANNEL_ITEM_SUCCESS]: (state, { id }) => ({
    ...state,
    isDeletedItem: true,
    items: state.items.filter(item => item.id !== id)
  }),
  [DELETE_MY_CHANNEL_ITEM_ERROR]: state => ({
    ...state,
    isDeletedItem: false
  }),
  [DELETE_MY_CHANNEL_ITEM_FIN]: state => ({
    ...state,
    isDeletedItem: false
  })
};

const GridReducer = createReducer(initialState, {
  ...fetchItemReducer,
  ...deleteItemReducer
});

export default GridReducer;

function* makeWithQuestionCount(item) {
  const res = yield call(agent.Comment.byLectureId, item.id);
  return { ...item, questionCount: res.comments.length };
}

function* fetchMyChannelItems() {
  yield put({
    type: FETCH_READY_MY_CHANNEL
  });
  try {
    const items = yield call(agent.Grid.all);
    const itemsWithQuestion = yield all(_.map(items, item => makeWithQuestionCount(item)));
    yield put({
      type: FETCH_MY_CHANNEL_SUCCESS,
      items: itemsWithQuestion
    });
  } catch (err) {
    logger.error(err);
    yield put({
      type: FETCH_MY_CHANNEL_ERROR,
      message: err.message
    });
  }
}

function* deleteMyChannelItem({ id }) {
  yield put({
    type: DELETE_READY_MY_CHANNEL_ITEM
  });

  try {
    yield call(agent.Lecture.delete, id);
    yield put({
      type: DELETE_MY_CHANNEL_ITEM_SUCCESS,
      id
    });
    yield put({
      type: DELETE_MY_CHANNEL_ITEM_FIN
    });
  } catch (e) {
    yield put({
      type: DELETE_MY_CHANNEL_ITEM_ERROR,
      message: err.message
    });
  }
}

export function* rootSaga() {
  yield takeLatest(FETCH_MY_CHANNEL, fetchMyChannelItems);
  yield takeLatest(DELETE_MY_CHANNEL_ITEM, deleteMyChannelItem);
}
