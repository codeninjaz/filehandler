import React from 'react';
import Droparea from './droparea';
import FiletreeController from './filetreectrl';
import Settings from '../settings.json';

export default class Filehandler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
    <div>
      <Droparea />
      <FiletreeController />
    </div>
    );
 }
}
