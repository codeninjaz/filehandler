import React       from 'react';
import FileTree    from './components/filetree';
import $           from 'jquery'
import Store       from './data/treestore';
import TreeActions from './data/treeactions';
import API         from './data/apicom';
import Const       from './data/fluxconstants';

class App extends React.Component {
  constructor(props) {
    super(props);
    let s = new Store();
    this.store = s.GetTreeStore(this.props.root);
    this.state = {
      data: {},
    }
  }
  componentDidMount() {
    this.store.addChangeListener(this.onChange.bind(this));
    TreeActions.gotFiletreeData({
      data: {},
      actionType: Const.PENDING
    });
    API.getData(this.props.root);
  }
  componentWillUnmount() {
    this.store.removeChangeListener(this.onChange.bind(this));
  }
  onChange() {
    this.setState(this.store.getState());
  }
  render() {
    return (<FileTree data = {this.state.data}/>)
  }
}

$('.filehandler').each(function() {
  React.render(<App root={$(this).attr('data-root')}/>, $(this)[0]);
});
