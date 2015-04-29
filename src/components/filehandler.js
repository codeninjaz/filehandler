import React              from 'react';
import Settings           from '../settings.json';
import Droparea           from './droparea';
import FiletreeController from './filetreectrl';

export default class Filehandler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
    <div>
      <FiletreeController />
    </div>
    );
 }
}
