import React    from 'react';
import Util     from '../helpers/util';
import Settings from '../settings.json';
import Actions  from '../data/treeactions';
import EditBox  from './editbox';
import AddLink  from './addlink';

export default class FileTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.file
    }
  }

  handleClick(mode, e) {
    switch (mode) {
      case 'edit':
        e.preventDefault();
        e.stopPropagation();
        Actions.startEditmode(this.props.file);
      break;
      case 'delete':
        e.preventDefault();
        e.stopPropagation();
        let infoText = 'filen / katalogen'
        if (this.props.data.selectedItems.length > 1) {
          infoText = 'filerna / katalogerna'
        }
        if (confirm('Vill du verkligen ta bort ' + infoText + '?')) {
          Actions.deleteItem(this.props.data.selectedItems);
        }
      break;
      case 'done':
        e.preventDefault();
        e.stopPropagation();
        Actions.doneEditing(this.props.file);
      break;
      case 'info':
        e.preventDefault();
        e.stopPropagation();
        Actions.showInfo(this.props.file);
      break;
      case 'add':
        e.preventDefault();
        e.stopPropagation();
        Actions.addLinkTo(this.props.file);
      break;
    }
  }

  getStyle(st) {
    if (this.props.file.showInfo) {
      st.color = '#2E9954'
    }
    return st;
  }

  render() {
    let file     = this.state.file;
    let editTool =
          <i
            className = {'fa fa-' + Settings.toolIcon.edit}
            onClick   = {this.handleClick.bind(this, 'edit')}
          ></i>
    let deleteTool = <i
          style     = {{paddingLeft:'10px'}}
          className = {'fa fa-' + Settings.toolIcon.delete}
          onClick   = {this.handleClick.bind(this, 'delete')}
        ></i>
    let doneTool = <span>
      <EditBox file = {file} />
      <i
          style     = {{paddingLeft:'10px'}}
          className = {'fa fa-' + Settings.toolIcon.done}
          onClick   = {this.handleClick.bind(this, 'done')}
      ></i>
      </span>
    let infoTool = <i
          style     = {this.getStyle({paddingLeft:'10px'})}
          className = {'fa fa-' + Settings.toolIcon.info}
          onClick   = {this.handleClick.bind(this, 'info')}
        ></i>
    let addTool = <i
          style     = {{paddingLeft:'10px'}}
          className = {'fa fa-' + Settings.toolIcon.add}
          onClick   = {this.handleClick.bind(this, 'add')}
        ></i>
    return (
      <span style={{paddingLeft:'10px'}}>
      {this.props.tools.edit ? editTool : null}
      {this.props.tools.delete ? deleteTool : null}
      {this.props.tools.info ? infoTool : null}
      {this.props.tools.add ? addTool : null}
      {this.props.tools.done ? doneTool : null}
      </span>
    )
  }
}
