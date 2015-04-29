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
    API.getApiData();
  }
  getTree() {
    let items = [];
    let self = this;
    if (self.props.status === Const.ERROR) {
      return (
          <div style={{backgroundColor: 'red'}}>
            ERROR: {self.props.treedata}
          </div>
        )
    } else {
      //Rendera rotnivå
      _.forEach(self.props.treedata.children, function(item, index) {
        items.push(
            <Fileitem
              key          = {index}
              info         = {item}
              padding      = {0}
              selectedItem = {self.props.selectedItem}
              openFolders  = {self.props.openFolders}
              editItem     = {self.props.editItem}
            />
          )
      });
      <InfoBox file={self.props.selectedItem} />
      return (
          <div>
            <ul style={{listStyle:'none', padding:0}}>
              {items}
            </ul>
            <button onClick={self.updateTree.bind(self)}>Uppdatera</button>
          </div>
        )
    }
  }
  render() {
    return this.getTree();
  }
}
