import { FETCH_READY_MY_CHANNEL, FETCH_MY_CHANNEL_SUCCESS, FETCH_MY_CHANNEL_ERROR } from './actions';

const initialState = {
  items: []
};

const GridReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MY_CHANNEL_SUCCESS:
      return {
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
          createdAt: item['created_at'],
          updatedAt: item['updated_at'],
          questionCount: item.questionCount
        }))]
      };
    case FETCH_READY_MY_CHANNEL:
    case FETCH_MY_CHANNEL_ERROR:
      return initialState;
    default:
      return state;
  }
};

export default GridReducer;
