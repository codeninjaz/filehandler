import React    from 'react';
import Util     from '../helpers/util';
import Settings from '../settings.json';
import Actions  from '../data/treeactions';
import EditBox  from './editbox';
import AddLink  from './addlink';
import API      from '../data/apicom';

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
          API.deleteFiles(this.props.data.selectedItems);
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
      case 'addlink':
        e.preventDefault();
        e.stopPropagation();
        Actions.addLinkTo(this.props.file);
      break;
    }
  }

  getStyle(style, property) {
    if (property) {
      style.color = Settings.toolbar.buttonOnColor
    }
    return style;
  }

  render() {
    let file     = this.state.file;
    let showAddLink = this.props.data.addLinkTo === file;
    let editTool =
          <i
            className = {'fa fa-' + Settings.toolbar.editIcon}
            onClick   = {this.handleClick.bind(this, 'edit')}
          ></i>
    let deleteTool = <i
          style     = {{paddingLeft: '10px'}}
          className = {'fa fa-' + Settings.toolbar.deleteIcon}
          onClick   = {this.handleClick.bind(this, 'delete')}
        ></i>
    let doneTool = <span>
      <EditBox file = {file} />
      <i
          style     = {{paddingLeft: '10px'}}
          className = {'fa fa-' + Settings.toolbar.doneIcon}
          onClick   = {this.handleClick.bind(this, 'done')}
      ></i>
      </span>
    let infoTool = <i
          style     = {this.getStyle({paddingLeft: '10px'}, this.props.file.showInfo)}
          className = {'fa fa-' + Settings.toolbar.infoIcon}
          onClick   = {this.handleClick.bind(this, 'info')}
        ></i>
    let addLinkTool = <i
          style     = {this.getStyle({paddingLeft: '10px'}, showAddLink)}
          className = {'fa fa-' + Settings.toolbar.addLinkIcon}
          onClick   = {this.handleClick.bind(this, 'addlink')}
        ></i>
    return (
      <span style={{marginLeft: '10px', paddingLeft: '3px', paddingRight: '3px', border: 'solid 1px #ddd'}}>
      {this.props.tools.edit ? editTool : null}
      {this.props.tools.delete ? deleteTool : null}
      {this.props.tools.info ? infoTool : null}
      {this.props.tools.addlink ? addLinkTool : null}
      {this.props.tools.done ? doneTool : null}
      </span>
    )
  }
}
