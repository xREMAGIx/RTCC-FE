import './App.scss';
import React from 'react';

import Example from 'components/templates/Example';
// import Home from 'pages/Home';
import Room from 'pages/Room';

const App: React.FC = () => (
  <div>
    <Example />
    <Room />
  </div>
);

export default App;
