import React    from 'react';
import Actions  from '../data/treeactions';
import Util     from '../helpers/util';

export default class Editbox extends React.Component {
  constructor(props) {
    super(props);
    this.suffix = Util.getExtension(this.props.file.name);
    this.state = {
      file: this.props.file,
      fileName: Util.removeSuffix(this.props.file.name)
    };
  }
  handleInputClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleNameEdit(e) {
    let st = this.state;
    st.fileName = e.target.value;
    if (this.props.file.type === 'dir') {
      st.file.name = st.fileName;
    }else {
      st.file.name = st.fileName + '.' + this.suffix;
    }
    this.setState(st);
  }
  handleUrlEdit(e) {
    let st = this.state;
    st.file.link = e.target.value;
    this.setState(st);
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      Actions.doneEditing(this.state.file, this.props.data);
    }
  }
  setFocus() {
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
    let inputName = (
      <span>
        <label>Namn: </label>
        <input
          ref        = 'nameInput'
          type       = 'text'
          value      = {this.state.fileName}
          onChange   = {this.handleNameEdit.bind(this)}
          onClick    = {this.handleInputClick.bind(this)}
          onKeyPress = {this.handleKeyPress.bind(this)}
        />
      </span>
      );
    let inputLinkUrl = (
        <span>
          <label>Länk: </label>
          <input
            ref        = 'urlInput'
            type       = 'text'
            value      = {this.state.file.link}
            onChange   = {this.handleUrlEdit.bind(this)}
            onClick    = {this.handleInputClick.bind(this)}
            onKeyPress = {this.handleKeyPress.bind(this)}
          />
        </span>
      );
    return (
      <span>
        {inputName}
        {this.props.file.type === 'link' ? inputLinkUrl : null}
      </span>
    );
  }
}
