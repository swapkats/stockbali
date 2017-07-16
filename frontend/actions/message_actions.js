import * as MessageAPIUtil from '../util/message_api_util';
import * as EmoticonAPIUtil from '../util/emoticon_api_util';
import * as GiphyAPIUtil from '../util/giphy_api_util';

import { closeEmoticonPicker } from './modal_actions';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';

export const ADD_EMOTICON = 'ADD_EMOTICON';
export const REMOVE_EMOTICON = 'REMOVE_EMOTICON';

export const receiveMessage = (message, channel, user) => ({
  type: RECEIVE_MESSAGE,
  message,
  channel,
  user
});

export const editMessage = (data) => ({
  type: EDIT_MESSAGE,
  data
});

export const removeMessage = (id) => ({
  type: REMOVE_MESSAGE,
  id
});

export const updateMessage = (message) => dispatch => {
  return MessageAPIUtil.updateMessage(message);
};

export const deleteMessage = (id) => dispatch => {
  return MessageAPIUtil.deleteMessage(id)
    .then((id) => dispatch(removeMessage(id)));
};

export const addEmoticon = (icon) => dispatch => {
  return EmoticonAPIUtil.createEmoticon(icon)
    .then(() => dispatch(closeEmoticonPicker()));
};

export const removeEmoticon = (id) => dispatch => {
  return EmoticonAPIUtil.deleteEmoticon(id);
};

export const fetchGiphyUrl = (query) => dispatch => {
  return GiphyAPIUtil.fetchGiphyUrl(query);
}
