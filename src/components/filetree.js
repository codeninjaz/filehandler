import React from 'react';
import Const from '../data/fluxconstants';
import API from '../data/apicom';
import Fileitem from './fileitem';
import _ from 'lodash';

export default class Filetree extends React.Component {
  constructor(props) {
    super(props);
  }
  updateTree() {
    API.getApiData();
  }
  getTree() {
    var items = [];
    if (this.props.status === Const.ERROR) {
      return (
          <div style={{backgroundColor: 'red'}}>
            ERROR: {this.props.treedata}
          </div>
        )
    } else {
      _.forEach(this.props.treedata, function(item, index) {
        items.push(
            <li key={index}>
              <Fileitem info={item} showChildren={false}/>
            </li>
          )
      });
      return (
          <div>
            <ul style={{listStyle:'none'}}>
              {items}
            </ul>
            <button onClick={this.updateTree.bind(this)}>Uppdatera</button>
          </div>
        )
    }
  }
  render() {
    return this.getTree();
  }
}
