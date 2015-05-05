import React       from 'react';
import FileTree    from './filetree';
import Settings    from '../settings.json';
import TreeStore   from '../data/treestore';
import TreeActions from '../data/treeactions';
import API         from '../data/apicom';
import Const       from '../data/fluxconstants';

export default class FiletreeCtrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treedata:[],
    }
  }
  componentDidMount() {
    TreeStore.addChangeListener(this.onChange.bind(this));
    TreeActions.gotFiletreeData({
      data: [],
      actionType: Const.PENDING
    });
    API.getData();
  }
  componentWillUnmount() {
    TreeStore.removeChangeListener(this.onChange.bind(this));
  }
  onChange() {
    let state = TreeStore.getState();
    console.log('state', state);
    this.setState(state);
  }
  render() {
    return (
      <FileTree
        treedata     = {this.state.treedata}
        selectedItem = {this.state.selectedItem}
        openFolders  = {this.state.openFolders}
        editItem     = {this.state.editItem}
      />
    );
  }
}
