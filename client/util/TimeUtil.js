import moment from 'moment';

export function dateTimeFormat(value, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = moment.utc(value);
  return date.format(format);
};
