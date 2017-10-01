import * as ChannelAPIUtil from '../util/channel_api_util';
import * as MessageAPIUtil from '../util/message_api_util';

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const RECEIVE_ALL_PUBLIC_CHANNELS = 'RECEIVE_ALL_PUBLIC_CHANNELS';
export const RECEIVE_ALL_PRIVATE_CHANNELS = 'RECEIVE_ALL_PRIVATE_CHANNELS';

const startLoading = loading => ({
  type: START_LOADING,
  loading,
});

const stopLoading = () => ({
  type: STOP_LOADING,
});

const receivePublicChannels = channels => ({
  type: RECEIVE_ALL_PUBLIC_CHANNELS,
  channels,
});

const receivePrivateChannels = channels => ({
  type: RECEIVE_ALL_PRIVATE_CHANNELS,
  channels,
});

const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel,
});

const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message,
});

const removeChannel = channel => ({
  type: REMOVE_CHANNEL,
  channel,
});

export const fetchPublicChannels = () =>
  (dispatch) => {
    dispatch(startLoading('CHAT_SCREEN'));
    return ChannelAPIUtil.fetchPublicChannels().then(
      (channels) => {
        dispatch(receivePublicChannels(channels));
        dispatch(stopLoading());
      },
    );
  };

export const fetchChannel = (userId, channelId) =>
  dispatch =>
    ChannelAPIUtil.fetchChannel(userId, channelId).then(
      channel => (dispatch(receiveChannel(channel))),
    );

export const createChannel = channel =>
  dispatch =>
    ChannelAPIUtil.createChannel(channel).then(
      channelData => (dispatch(receiveChannel(channelData))),
    );

export const editChannel = channel =>
  dispatch => ChannelAPIUtil.editChannel(channel).then(
    channelData => (dispatch(receiveChannel(channelData))),
  );

export const createMessage = message =>
  () => MessageAPIUtil.createMessage(message);

export const createPublicSubscription = channelId =>
  dispatch => ChannelAPIUtil.createPublicSubscription(channelId).then(
    channel => (dispatch(receiveChannel(channel))),
  );

export const deleteChannel = id =>
  () => ChannelAPIUtil.deleteChannel(id);
