import React       from 'react';
import FileTree    from './filetree';
import Settings    from '../settings.json';
import Store       from '../data/treestore';
import TreeActions from '../data/treeactions';
import API         from '../data/apicom';
import Const       from '../data/fluxconstants';

export default class FiletreeCtrl extends React.Component {
  constructor(props) {
    super(props);
    let s = new Store();
    this.store = s.GetTreeStore(this.props.id);
    this.state = {
      data: {},
    }
  }
  componentDidMount() {
    console.log('this.props.id', this.props.id);
    console.log('this.store', this.store);
    console.log('this.store.dispatcherID', this.store.dispatcherID);
    this.store.addChangeListener(this.onChange.bind(this));
    TreeActions.gotFiletreeData({
      data: {},
      actionType: Const.PENDING
    });
    API.getData(this.props.id);
  }
  componentWillUnmount() {
    this.store.removeChangeListener(this.onChange.bind(this));
  }
  onChange() {
    let state = this.store.getState();
    console.log('onChange - state.data.id', state.data.id);
    this.setState(state);
  }
  render() {
    return (
      <FileTree data = {this.state.data} />
    );
  }
}
