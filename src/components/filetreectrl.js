import React from 'react';
import FileTree from './filetree';
import Settings from '../settings.json';
import TreeStore from '../data/treestore';
import TreeActions from '../data/treeactions';
import API from '../data/apicom';
import Const from '../data/fluxconstants';

export default class FiletreeCtrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treedata:[],
      status: ''
    }
  }
  componentDidMount() {
    TreeStore.addChangeListener(this.onChange.bind(this));
    TreeActions.gotFiletreeData({
      data: [],
      actionType: Const.PENDING
    });
    API.getApiData();
  }
  componentWillUnmount() {
    TreeStore.removeChangeListener(this.onChange.bind(this));
  }
  onChange() {
    this.setState(TreeStore.getState());
  }
  render() {
    return (
      <FileTree treedata={this.state.treedata} selectedItem={this.state.selectedItem} status={this.state.status} />
    );
  }
}
