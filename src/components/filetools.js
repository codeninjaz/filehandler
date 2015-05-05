import React    from 'react';
import Util     from '../helpers/util';
import Settings from '../settings.json';
import Actions  from '../data/treeactions';

export default class Fileinfo extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(mode, e) {
    switch (mode) {
      case 'edit':
        e.stopPropagation();
        Actions.setEditmode(this.props.file);
      break;
      case 'delete':
        Actions.deleteItem(this.props.file);
      break;
      case 'done':
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
        Actions.setAddMode(this.props.file);
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
    let editTool = <i
          className = {'fa fa-' + Settings.toolIcon.edit}
          onClick   = {this.handleClick.bind(this, 'edit')}
        ></i>
    let deleteTool = <i
          style     = {{paddingLeft:'10px'}}
          className = {'fa fa-' + Settings.toolIcon.delete}
          onClick   = {this.handleClick.bind(this, 'delete')}
        ></i>
    let doneTool = <i
          style     = {{paddingLeft:'10px'}}
          className = {'fa fa-' + Settings.toolIcon.done}
          onClick   = {this.handleClick.bind(this, 'done')}
        ></i>
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
