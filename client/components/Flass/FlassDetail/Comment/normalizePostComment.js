const isMaxLength = max => value => (value && value.length > max);

const MAX_LENGTH = 500;

const normalizePostComment = value => (isMaxLength(MAX_LENGTH)(value) ? value.substr(0, 500) : value);

export default normalizePostComment;
