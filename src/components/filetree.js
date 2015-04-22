import React from 'react';
import Settings from '../settings.json';
import TreeStore from '../data/treestore';

export default class Filetree extends React.Component {
  constructor(props) {
    super(props);
    console.log('TreeStore', TreeStore.getItems());
  }
  render() {
   return (
    <div>
      <span>Filetree</span>
    </div>
    );
 }
}
