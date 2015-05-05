import React    from 'react';
import Actions  from '../data/treeactions';

export default class Editbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.file
    }
  }
  handleInputClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleEdit(e) {
    let file  = this.state.file;
    file.name = e.target.value;
    this.setState({
      file: file
    })
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      Actions.doneEditing(this.state.file);
    }
  }
  setFocus() {
    console.log('this.refs', this.refs);
    let inp = React.findDOMNode(this.refs.nameInput);
    if (inp) {
      inp.focus();
      inp.setSelectionRange(this.state.file.name.length, this.state.file.name.length); //Sätter markören i slutet av texten
    }
  }
  componentDidMount() {
    this.setFocus();
  }
  render() {
    return (
      <input
        ref        = 'nameInput'
        type       = 'text'
        value      = {this.state.file.name}
        onChange   = {this.handleEdit.bind(this)}
        onClick    = {this.handleInputClick.bind(this)}
        onKeyPress = {this.handleKeyPress.bind(this)}
      />
    )
  }
}
