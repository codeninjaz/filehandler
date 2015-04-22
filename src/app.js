import React from 'react';
import FileHandler from './components/filehandler'

require('./styles/font-awesome.min.css')

class App extends React.Component {
  render() {
    return (
      <FileHandler />
      )
  }
}

React.render(<App />, document.getElementById('app'));

