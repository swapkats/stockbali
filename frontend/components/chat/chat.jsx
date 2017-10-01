import React from 'react';
import { connect } from 'react-redux';

import { fetchChannel, fetchPublicChannels } from '../../actions/channel_actions';
import { setChannel } from '../../actions/current_channel_actions';

import Spinner from './spinner';
import UserSection from './user/user-section';
import MainSection from './main/main-section';
import ChannelSection from './channel/channel-section';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.pusher = new Pusher('d46870f8b7c4c1636fca', {
      encrypted: true
    });

    this.channel = this.pusher.subscribe('application');

    this.channel.bind('notify', (data) => {
      if(this.props.user
        && data.private === true
        && data.receivers.includes(this.props.user.id)
        && data.authorId  !== this.props.user.id
        && data.channelId !== this.props.channel.id)
      {
        this.showDirectMessageAlert(data.author);
      }
    }, this);

    this.channel.bind('updateChat', () => {
      this.props.fetchChannel(this.props.user.id, this.props.channel.id);
    }, this);
  }

  showDirectMessageAlert(author){
    msg.show(`You have a message from ${author}!`, {
      time: 3000,
      type: 'info',
      icon: <img src={ window.assets.logoSq35 } />
    });
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  componentWillMount() {
    this.props.fetchPublicChannels();
    this.props.fetchChannel(this.props.user.id, this.props.user.current_channel)
              .then(() => {
                const channel = {
                  id: this.props.channel.id,
                  name: this.props.channel.name,
                  description: this.props.channel.description
                };
                this.props.setChannel(channel);
              });
  }

  render() {
    if (this.props.loading === 'CHAT_SCREEN') {
      return (
        <Spinner />
      );
    }

    return (
      <div className='chat-container'>
        <UserSection />
        <MainSection />
        <ChannelSection />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.currentUser,
  channel: state.channel,
  loading: state.loading.type
});

export default connect(
  mapStateToProps,
  { fetchChannel, setChannel, fetchPublicChannels }
)(Chat);
