import React from 'react';
import { connect } from 'react-redux';

import EmoticonItem from './emoticon-item';

class Emoticons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emoticons: this.props.emoticons,
    };

    this.buildIcons = this.buildIcons.bind(this);
    this.buildIconsData = this.buildIconsData.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ emoticons: newProps.icons });
  }

  buildIcons() {
    if (this.state.emoticons) {
      const iconsData = this.buildIconsData();

      return Object.keys(iconsData).map((emoticon, i) => (
        <li key={ i } >
          <EmoticonItem emoticon={ emoticon }
            count={ iconsData[emoticon].count }
            authors={ iconsData[emoticon].authors }
            messageId={ this.props.messageId }
            allEmoticons={ this.props.allEmoticons } />
        </li>
      ));
    }
  }

  buildIconsData() {
    const iconsData = {};

    this.state.emoticons.forEach((emoticon) => {
      if (iconsData.hasOwnProperty(emoticon.icon)) {
        iconsData[emoticon.icon].count += 1;
        iconsData[emoticon.icon].authors.push(emoticon.user_id);
      } else {
        iconsData[emoticon.icon] = { count: 1,
                                     authors: [emoticon.user_id] };
      }
    });

    return iconsData;
  }

  render() {
    return (
      <div className='emoticonsContainer'>
        <ul className='emoticonsList'>
          { this.buildIcons() }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  emoticons: ownProps.icons,
  messageId: ownProps.message.id,
  allEmoticons: ownProps.allEmoticons,
});

export default connect(
  mapStateToProps,
  null
)(Emoticons);
