//Visar den inre informationen per fil.
import React     from 'react';
import Util      from '../helpers/util';
import Settings  from '../settings.json';
import FileTools from './filetools';
import InfoBox   from './infobox';
import AddLink from './addlink';
import Actions   from '../data/treeactions';

export default class Fileinfo extends React.Component {
  constructor(props) {
    super(props);
  }

  getFileTools(file, tools) {
    return (
      <FileTools file={file} tools={tools} data={this.props.data}/>
    );
  }

  getInfoBox() {
    return (
      <InfoBox file={this.props.file}/>
    );
  }
  getAddLink() {
    return (
      <AddLink file={this.props.file}/>
    );
  }
  handleFolderClick(e) {
    e.stopPropagation();
    if (!this.props.file.parentId) {
      return;
    }
    if (this.props.file.open) {
      Actions.closeFolder(this.props.file);
    } else {
      Actions.openFolder(this.props.file);
    }
  }
  handleSelect(e) {
    if (Util.isSelected(this.props.file, this.props.data.selectedItems)) {
      Actions.deselectItem(this.props.file);
    } else {
      Actions.selectItem(this.props.file, e.ctrlKey);
    }
  }
  render() {
    let self        = this;
    let file        = this.props.file;
    let selected    = Util.isSelected(file, this.props.data.selectedItems);
    let editing     = this.props.data.editItem ? this.props.data.editItem.id === file.id : false;
    let open        = this.props.open;
    let showInfo    = this.props.file.showInfo;
    let showAddLink = this.props.data.addLinkTo === this.props.file;

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
      return Util.getFileIcon(file).icon;
    }
    function getStyle() {
      return ({
        fontWeight: selected ? 'bold' : 'normal',
        position: 'relative'
      });
    }
    function getIconStyle(file) {
      return ({
        color: Util.getFileIcon(file).color
      });
    }
    function getEditStyle() {
      return ({
        position: 'relative'
      });
    }
    //Om detta är rotnoden
    if (!file.parentId) {
      return (
        <span style={getStyle()}>
          <i className={'fa fa-' + Settings.rootIcon} />
          <span onClick = {this.handleSelect.bind(this)}> rot</span>
          {selected ? this.getFileTools(file, {addlink: true, info: true}) : null}
          {showInfo ? this.getInfoBox() : null}
          {showAddLink ? this.getAddLink() : null}
        </span>
      );
    }
    //Om vi är i redigeringsläge
    if (editing) {
      return (
        <span style={getEditStyle()}>
          <i style={getIconStyle(file)} className={'fa fa-' + getIcon(file)} />
          {this.getFileTools(file, {done: true})}
        </span>
      );
    } else {
      //Normalfallet
      return (
        <span style={getStyle()}>
          <i style={getIconStyle(file)} className={'fa fa-' + getIcon(file)} onClick = {this.handleFolderClick.bind(this)}/>
          <span onClick={this.handleSelect.bind(this)}> {file.name}{getData()}</span>
          {selected ? this.getFileTools(file, {edit: true, delete: true, addlink: this.props.file.type === 'dir', info: true}) : null}
          {showInfo ? this.getInfoBox() : null}
          {showAddLink ? this.getAddLink() : null}
        </span>
      );
    }
  }
}
