import React from 'react';
import Droparea from './droparea';
import Filetree from './filetree';

export default class Filehandler extends React.Component {
  constructor(props) {
    super(props);
    this.dropSettings = {
      style: {
        height: '200px',
        backgroundColor: '#9BEEFF'
      },
      maxFileSize: 100 * 1024
    }
  }
  render() {
   return (
    <div>
      <Droparea settings={this.dropSettings} />
      <Filetree />
    </div>
    );
 }
}
