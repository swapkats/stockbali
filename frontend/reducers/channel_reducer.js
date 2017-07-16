import { RECEIVE_CHANNEL,
         RECEIVE_MESSAGE } from '../actions/channel_actions';

import { REMOVE_MESSAGE,
         EDIT_MESSAGE } from '../actions/message_actions';

import merge from 'lodash/merge';
import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';

const initialState = {};

const ChannelReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNEL:
      return merge({}, {
        id: action.channel.id,
        name: action.channel.name,
        description: action.channel.description,
        messages: action.channel.messages,
        createdAt: action.channel.created_at,
        userCount: action.channel.userCount,
        users: action.channel.users,
        displayName: action.channel.display_name,
        private: action.channel.private
      });

    case RECEIVE_MESSAGE:
      let newState = merge({}, state);
      newState.messages.unshift(action.message.messages);
      return newState;

    case EDIT_MESSAGE:
      let editState = merge({}, state);
      let editStateMessages = editState.messages;
      let messageIndex = findIndex(editStateMessages, (message) => (message.id === action.data.message.id));

      editState.messages[messageIndex].content = action.data.message.content;
      editState.messages[messageIndex].emoticons = action.data.emoticons;
      return editState;

    case REMOVE_MESSAGE:
      let copiedState = merge({}, state);
      let copiedMessages = copiedState.messages;

      remove(copiedMessages, (copiedMessage) => {
        return copiedMessage.id === action.id;
      });

      return merge({}, copiedState, { messages: copiedMessages });

    default:
      return state;
  }
};

export default ChannelReducer;
