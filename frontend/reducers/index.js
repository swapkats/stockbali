import { combineReducers } from 'redux';

import SessionReducer from './session';
import CurrentChannelReducer from './current_channel';
import ChannelReducer from './channel';
import AllChannelsReducer from './all_channels';
import ModalReducer from './modal';
import UserReducer from './user';
import loading from './loading';

const RootReducer = combineReducers({
  session: SessionReducer,
  channel: ChannelReducer,
  currentChannel: CurrentChannelReducer,
  modal: ModalReducer,
  allChannels: AllChannelsReducer,
  users: UserReducer,
  loading,
});

export default RootReducer;
