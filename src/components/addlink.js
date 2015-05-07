import React    from 'react';
import Actions  from '../data/treeactions';
import Settings from '../settings.json';
import API   from '../data/apicom';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkname: '',
      linkurl: ''
    }
  }
  handleLnkNameChange(e) {
    let st = this.state;
    st.linkname = e.target.value;
    this.setState(st);
  }
  handleLnkUrlChange(e) {
    let st = this.state;
    st.linkurl = e.target.value;
    this.setState(st);
  }
  handleDoneClick(e) {
    API.createLink(this.state.linkname, this.state.linkurl, this.props.file);
  }
  render() {
    let createButton = (
      <i
        style     = {{paddingLeft: '10px'}}
        className = {'fa fa-' + Settings.toolbar.createIcon}
        onClick   = {this.handleDoneClick.bind(this)}
      ></i>
    );
    return (
      <div>
        <label for='inputLinkName'>Namn på länken: </label>
        <input id='inputLinkName' value={this.state.linkname} onChange={this.handleLnkNameChange.bind(this)} ref='linkText' type='text' />
        <label for='inputLinkUrl'>Länkapp: </label>
        <input id='inputLinkUrl' value={this.state.linkurl} onChange={this.handleLnkUrlChange.bind(this)} ref='linkText' type='text' />
        {this.state.linkname && this.state.linkurl ? createButton : null}
      </div>
    );
  }
}
