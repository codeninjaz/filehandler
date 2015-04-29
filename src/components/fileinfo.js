//Visar den inre informationen per fil.
import React     from 'react';
import Util      from '../helpers/util';
import Settings  from '../settings.json';
import FileTools from './filetools';
import Actions  from '../data/treeactions';

export default class Fileinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.file
    }
  }

  getFileTools(file, tools) {
    return (
      <FileTools file={file} tools={tools} nameInput = {this.refs.nameInput}/>
    );
  }

  handleEdit(e) {
    let f = this.state.file;
    f.name = e.target.value;
    this.setState({
      file: f
    })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      Actions.doneEditing(this.state.file);
    }
  }

  setFocus() {
    if (this.props.editing) {
      let inp = React.findDOMNode(this.refs.nameInput);
      if (inp) {
        inp.focus();
      }
    }
  }

  componentDidUpdate(){
    this.setFocus();
  }

  render() {
    let file     = this.state.file;
    let open     = this.props.open;
    let selected = this.props.selected;
    let editing  = this.props.editing;

    function getData() {
      return file.size > 0 ? ' - ' + Util.toOneDecimal(file.size / 1024) + 'KiB' : null
    }
    function getIcon() {
      if (file.type === 'dir') {
        if (open) {
          return Settings.openFolderIcon;
        }else {
          return Settings.folderIcon;
        }
      }
      return Util.getFileIcon(file)
    }
    function getStyle() {
      return ({
        fontWeight: selected ? 'bold' : 'normal',
      });
    }
    function getEditStyle() {
      return ({});
    }
    if (editing) {
      return (
        <span style={getEditStyle()}>
          <i className={'fa fa-' + getIcon(file)} />
          <input
            ref='nameInput'
            type='text'
            value={file.name}
            onChange={this.handleEdit.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)} />
          {this.getFileTools(file, {done: true})}
        </span>
      )
    } else {
      return (
        <span style={getStyle()}>
          <i className={'fa fa-' + getIcon(file)} />
          <span> {file.name}{getData()}</span>
          {selected && file.type !== 'dir' ? this.getFileTools(file, {edit: true, delete: true}) : null}
        </span>
      );
    }
  }
}
