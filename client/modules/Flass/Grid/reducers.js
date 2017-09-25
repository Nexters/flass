import {
  FETCH_MY_CHANNEL_SUCCESS,
  FETCH_MY_CHANNEL_ERROR,

  DELETE_READY_MY_CHANNEL_ITEM,
  DELETE_MY_CHANNEL_ITEM_SUCCESS,
  DELETE_MY_CHANNEL_ITEM_ERROR,
  DELETE_MY_CHANNEL_ITEM_FIN
} from './actions';
import {
  createReducer
} from '../../reducerHelper';
import { dateTimeFormat } from '../../../util/time-util';

const initialState = {
  items: [],
  isDeletedItem: false
};

const fetchItemReducer = {
  [FETCH_MY_CHANNEL_SUCCESS]: (state, action) => ({
    ...state,
    items: [...state.items, ...action.items.map(item => ({
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
    }))]
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
