import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { setChannel } from '../../../actions/current_channel_actions';
import { fetchChannel, fetchPublicChannels } from '../../../actions/channel_actions';
import { getUser } from '../../../actions/session_actions';
import { openChannelsViewModal } from '../../../actions/modal_actions';

import UserChannelItem from './user-channel-item';

class UserChannels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userChannels: this.props.userChannels,
      currentChannel: this.props.currentChannel,
      searchInput: '',
      allChannels: null,
      userChannels: null,
    };

    this.pusher = new Pusher('d46870f8b7c4c1636fca', {
      encrypted: true
    });

    this.channel = this.pusher.subscribe('application');

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchPublicChannels();
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
        <UserChannelItem key={i}
          channel={channel}
          currentChannel={this.props.currentChannel}
        />
      </button>
    ));
  }

  handleInput(e) {
    const searchInput = e.target.value;
    let userChannels = null;
    let allChannels = null;
    if (searchInput) {
      userChannels = this.props.userChannels.filter((channel) =>
        channel.name.includes(searchInput)
      );
      allChannels = this.props.allChannels.filter((channel) =>
        channel.name.includes(searchInput)
      );
    }
    this.setState({
      searchInput,
      allChannels,
      userChannels,
    });
  }

  render() {
    const channelCount = this.props.user.subscriptions.length;
    return (
      <section className="user-channels-container">
        <input
          className="user-channels-search-input"
          placeholder="Search channels"
          value={this.state.searchInput}
          onChange={this.handleInput}
          type="text"
        />
        <div className="user-channels-wrapper">
          <button onClick={this.props.openChannelsViewModal}>
            <h4>Watchlist
              <span className="user-channels-count">({ channelCount })</span>
            </h4>
          </button>

          <ul className="user-channels-list">
            {this.buildChannelItems(this.state.userChannels || this.props.userChannels)}
          </ul>

          <button onClick={this.props.openChannelsViewModal}>
            <h4>All Stocks
              <span className="user-channels-count">
                ({(this.state.allChannels && this.state.allChannels.length)
                  || this.props.allChannels.length})
              </span>
            </h4>
          </button>

          <ul className="user-channels-list">
            { this.buildChannelItems(this.state.allChannels || this.props.allChannels) }
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.currentUser,
  allChannels: Object.keys(state.allChannels).map(i => state.allChannels[i]),
  userChannels: state.session.currentUser.subscriptions,
  currentChannel: state.channel,
});

export default connect(
  mapStateToProps,
  { openChannelsViewModal, fetchChannel, setChannel, getUser, fetchPublicChannels },
)(UserChannels);
