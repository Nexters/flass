export const SAVE_COMMENT = 'SAVE_COMMENT';

export function saveComment(comment) {
  return { type: SAVE_COMMENT, payload: comment };
}
