import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { login, logout, signup } from '../../actions/session_actions';

class SessionControl extends React.Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  signout() {
    this.props.logout().then(() => this.props.router.push('/'));
  }

  guestLogin() {
    const user = {
      username: 'guest',
      password: 'guestlogin',
      email: 'guest@stockbaat.com'
    };

    this.props.login(user).then(() => this.props.router.push('/chat'));
  }

  render() {
    if (this.props.currentUser) {
      return (
        <section className='session-control'>
          <button className='session-control-btn'
                  onClick={ this.signout }>
            LOGOUT
          </button>
        </section>
      );
    } else {
      return (
        <section className='session-control'>
          <Link className='session-control-btn join-btn'
                to='/signup'>
            JOIN
          </Link>

          <Link className='session-control-btn' to='/login'>
            LOGIN
          </Link>

          <button className='session-control-guest-btn'
            onClick={ this.guestLogin }>
            GUEST
          </button>
        </section>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  signup: (user) => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SessionControl));
