import React       from 'react';
import FileTree    from './components/filetree';
import $           from 'jquery'
import Store       from './data/treestore';
import ApiCom      from './data/apicom';
import TreeActions from './data/treeactions';
import Const       from './data/fluxconstants';

class App extends React.Component {
  constructor(props) {
    super(props);
    let s = new Store();
    this.store = s.GetTreeStore(this.props.root);
    this.API = new ApiCom(this.props.api + '/', this.store.dispatcherID);
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    this.store.addChangeListener(this.onChange.bind(this));
    TreeActions.gotFiletreeData({
      data       : {},
      id         : this.store.dispatcherID,
      actionType : Const.PENDING
    });
    this.API.getData(this.props.root);
  }
  componentWillUnmount() {
    this.store.removeChangeListener(this.onChange.bind(this));
  }
  onChange() {
    this.setState(this.store.getState());
  }
  render() {
    return (<FileTree data={this.state.data} api={this.API}/>)
  }
}

$('.react-filehandler').each(function() {
  React.render(<App root={$(this).attr('data-root')} api={$(this).attr('data-api')}/>, $(this)[0]);
});
