import React from 'react';
import { connect } from 'react-redux';
import merge from 'lodash/merge';

import UserDMItem from './user-dm-item';
import DirectMessage from '../channel/direct-message.jsx';

import { openDirectMessageModal } from '../../../actions/modal_actions';
import { setChannel } from '../../../actions/current_channel_actions';
import { fetchChannel } from '../../../actions/channel_actions';
import { getUser } from '../../../actions/session_actions';

class UserDMs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directMessages: this.props.directMessages
    };

    this.pusher = new Pusher('d46870f8b7c4c1636fca', {
      encrypted: true
    });

    this.channel = this.pusher.subscribe('application');

    this.channel.bind('update', () => {
      this.props.getUser(this.props.user.id);
    }, this);

    this.sortDMItems = this.sortDMItems.bind(this);
    this.buildDMItems = this.buildDMItems.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.openDirectMessageForm = this.openDirectMessageForm.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({ directMessages: newProps.directMessages });
    }
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  sendMessage(channel) {
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
                  return channel;
                });
    };
  }

  openDirectMessageForm() {
    this.props.openDirectMessageModal([]);
  }

  sortDMItems() {
    let copiedDMs = [...this.state.directMessages];
    return copiedDMs;
  }

  buildDMItems() {
    return this.sortDMItems().map((directMessage, i) => {
      if (directMessage.users.length < 1) {
        return;
      }
      return (
        <button key={ i } onClick={ this.sendMessage(directMessage) }>
          <UserDMItem
            key={ i }
            directMessage={ directMessage }
            currentMessage={ this.props.currentMessage }
          />
        </button>
      );
    });
  }

  render() {
    return (
      <section className='user-dms-container'>
        <DirectMessage givenUser={ [] }/>
        <button className='user-dms-button'
                onClick={ this.openDirectMessageForm }>
          <h4>DIRECT MESSAGES</h4>
          <i className="fa fa-plus-circle fa-2" aria-hidden="true"></i>
        </button>

        <ul className='user-dms-list'>
          { this.buildDMItems() }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.session.currentUser) {
    return {
      user: state.session.currentUser,
      directMessages: state.session.currentUser.directMessages,
      currentMessage: state.channel
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDirectMessageModal: () => dispatch(openDirectMessageModal()),
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel)),
  getUser: (id) => dispatch(getUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDMs);
