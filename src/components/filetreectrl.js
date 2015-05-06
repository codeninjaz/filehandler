import React       from 'react';
import FileTree    from './filetree';
import Settings    from '../settings.json';
import TreeStore   from '../data/treestore';
import TreeActions from '../data/treeactions';
import Apicom      from '../data/apicom';
import Const       from '../data/fluxconstants';

let API = new Apicom();

export default class FiletreeCtrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
    }
  }
  componentDidMount() {
    TreeStore.addChangeListener(this.onChange.bind(this));
    TreeActions.gotFiletreeData({
      data: {},
      actionType: Const.PENDING
    });
    API.getData();
  }
  componentWillUnmount() {
    TreeStore.removeChangeListener(this.onChange.bind(this));
  }
  onChange() {
    let state = TreeStore.getState();
    this.setState(state);
  }
  render() {
    return (
      <FileTree data = {this.state.data} />
    );
  }
}
