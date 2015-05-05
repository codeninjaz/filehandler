import React    from 'react';
import Actions  from '../data/treeactions';
import Settings from '../settings.json';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkname: ''
    }
  }
  handleChange(e) {
    this.setState(
    {
      linkname: e.target.value
    });
  }
  handleDoneClick(e) {
    console.log('Done', this);
    console.log('this.refs', this.refs);
  }
  render() {
    return (
      <div>
        <input value={this.state.linkname} onChange={this.handleChange.bind(this)} ref='linkText' type='text' />
        <i
          style     = {{paddingLeft:'10px'}}
          className = {'fa fa-' + Settings.toolIcon.done}
          onClick   = {this.handleDoneClick.bind(this)}
        ></i>
      </div>
    );
  }
}
