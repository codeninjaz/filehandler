import React from 'react';
import FiletreeController from './components/filetreectrl';

require('./styles/font-awesome.min.css')

class App extends React.Component {
  render() {
    return (
          <FiletreeController />
          )
  }
}

React.render(<App />, document.getElementById('app'));
