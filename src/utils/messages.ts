import moment from 'moment'

export function formatMessage(userName: string, text: string) {
  return {
    userName,
    text,
    time: moment().format('h:mm a'),
  }
}
