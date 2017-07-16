import React from 'react';

import Navbar from './frontpage/navbar';
import VideoBackground from './frontpage/video_background';
import Banner from './frontpage/banner';

const App = ({ children }) => (
  <div className='app-container'>
    <Navbar />
    <VideoBackground />
    <Banner />

    { children }
  </div>
);

export default App;
