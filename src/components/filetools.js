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
        Actions.setEditmode(this.props.file);
      break;
      case 'done':
        Actions.doneEditing(this.props.file);
      break;
    }
  }
  render() {
    let editTool = <i
          className ={'fa fa-' + Settings.toolIcon.edit}
          onClick   ={this.handleClick.bind(this, 'edit')}
        ></i>
    let deleteTool = <i
          style     ={{paddingLeft:'10px'}}
          className ={'fa fa-' + Settings.toolIcon.delete}
          onClick   ={this.handleClick.bind(this, 'delete')}
        ></i>
    let doneTool = <i
          style     ={{paddingLeft:'10px'}}
          className ={'fa fa-' + Settings.toolIcon.done}
          onClick   ={this.handleClick.bind(this, 'done')}
        ></i>
    return (
      <span style={{paddingLeft:'10px'}}>
      {this.props.tools.edit ? editTool : null}
      {this.props.tools.delete ? deleteTool : null}
      {this.props.tools.done ? doneTool : null}
      </span>
    )
  }
}
