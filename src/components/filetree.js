import React    from 'react';
import Const    from '../data/fluxconstants';
import API      from '../data/apicom';
import Fileitem from './fileitem';
import InfoBox  from './infobox';
import _        from 'lodash';

export default class Filetree extends React.Component {
  constructor(props) {
    super(props);
  }
  updateTree() {
    API.getData();
  }
  getTree() {
    if (!this.props.data.treedata) {
      return null;
    }
    let items = [];
    let treedata = this.props.data.treedata;
    let self = this;
    if (self.props.status === Const.ERROR) {
      return (
          <div style={{backgroundColor: 'red'}}>
            ERROR: {self.props.treedata}
          </div>
        )
    } else {
      //Rendera rotnivå
      _.forEach(treedata.children, function(item, index) {
        items.push(
            <Fileitem
              key     = {index}
              file    = {item}
              padding = {0}
              data    = {self.props.data}
            />
          )
      });
      <InfoBox file={self.props.selectedItem} />
      return (
          <div>
            <div style={{padding: 0}}>
              <ul style={{listStyle: 'none', padding: 0}}>
                <Fileitem
                  key     = {'root'}
                  file    = {treedata}
                  padding = {0}
                  data    = {self.props.data}
                />
                {items}
              </ul>
            </div>
            <button onClick={self.updateTree.bind(self)}>Uppdatera</button>
          </div>
        )
    }
  }
  render() {
    return this.getTree();
  }
}
