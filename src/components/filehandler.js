import React from 'react';
import Droparea from './droparea';

export default class Filehandler extends React.Component {
  constructor(props) {
    super(props);
    this.dropSettings = {
      style: {
        width: 300,
        height: 200,
        backgroundColor: '#9BEEFF'
      }
    }
  }
  render() {
   return (
    <div>
      <span>Filehandler</span>
      <Droparea settings={this.dropSettings} />
    </div>
    );
 }
}
