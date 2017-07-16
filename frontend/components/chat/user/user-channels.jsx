import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { setChannel } from '../../../actions/current_channel_actions';
import { fetchChannel } from '../../../actions/channel_actions';
import { getUser } from '../../../actions/session_actions';
import { openChannelsViewModal } from '../../../actions/modal_actions';

import UserChannelItem from './user-channel-item';
import ChannelsView from '../channel/channels-view.jsx';

class UserChannels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userChannels: this.props.userChannels,
      currentChannel: this.props.currentChannel
    };

    this.pusher = new Pusher('d46870f8b7c4c1636fca', {
      encrypted: true
    });

    this.channel = this.pusher.subscribe('application');

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  changeChannel(channel) {
    return (e) => {
      this.props.fetchChannel(this.props.user.id, channel.id)
                .then((newChannel) => {
                  const channel = {
                    id: newChannel.channel.id,
                    name: newChannel.channel.name,
                    description: newChannel.channel.description,
                    private: newChannel.channel.private
                  };

                  this.props.setChannel(channel);
                  this.setState({ currentChannel: channel });
                });
    };
  }

  buildChannelItems(channels) {
    return channels.map((channel, i) => (
      <button key={i} onClick={ this.changeChannel(channel).bind(this) }>
        <UserChannelItem key={ i }
          channel={ channel }
          currentChannel={ this.props.currentChannel }
        />
      </button>
    ));
  }

  render() {
    const channelCount = this.props.user.subscriptions.length;

    return (
      <section className='user-channels-container'>
        <ChannelsView />

        <button onClick={ this.props.openChannelsViewModal }>
          <h4>Watchlist
            <span className='user-channels-count'>({ channelCount })</span>
          </h4>
        </button>

        <ul className='user-channels-list'>
          { this.buildChannelItems(this.props.userChannels) }
        </ul>

        <button onClick={ this.props.openChannelsViewModal }>
          <h4>All Stocks
            <span className='user-channels-count'>({ this.props.allChannels.count })</span>
          </h4>
        </button>

        <ul className='user-channels-list'>
          { this.buildChannelItems(this.props.allChannels) }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.currentUser,
    allChannels: Object.keys(state.allChannels).map((i) => state.allChannels[i]),
    userChannels: state.session.currentUser.subscriptions,
    currentChannel: state.channel
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openChannelsViewModal: () => dispatch(openChannelsViewModal()),
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel)),
  getUser: (id) => dispatch(getUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChannels);
