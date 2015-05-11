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
      <InfoBox file={this.props.file} data={this.props.data}/>
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
    if (Util.isOpen(this.props.file, this.props.data)) {
      Actions.closeFolder(this.props.file, this.props.data);
    } else {
      Actions.openFolder(this.props.file, this.props.data);
    }
  }
  handleSelect(e) {
    if (Util.isSelected(this.props.file, this.props.data)) {
      Actions.deselectItem(this.props.file, this.props.data);
    } else {
      Actions.selectItem(this.props.file, this.props.data, e.ctrlKey);
    }
  }
  openLink(e) {
    window.open(this.props.file.link, '_blank');
  }
  render() {
    let self        = this;
    let file        = this.props.file;
    let selected    = Util.isSelected(file, this.props.data);
    let editing     = this.props.data.editItem ? this.props.data.editItem.id === file.id : false;
    let open        = this.props.open;
    let showInfo    = Util.isShowingInfo(this.props.file, this.props.data);
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
    let spanStyle = {
        fontWeight: selected ? 'bold' : 'normal',
        position: 'relative'
      }
    let iconStyle = {
      color: Util.getFileIcon(file).color
    }
    //Om detta är rotnoden
    if (!file.parentId) {
      return (
        <span style={spanStyle}>
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
        <span style={{position: 'relative'}}>
          <i style={iconStyle} className={'fa fa-' + getIcon(file)} />
          {this.getFileTools(file, {done: true})}
        </span>
      );
    } else {
      //Normalfallet
      return (
        <span style={spanStyle}>
          <i style={iconStyle} className={'fa fa-' + getIcon(file)} onClick = {this.handleFolderClick.bind(this)}/>
          <span onClick={this.handleSelect.bind(this)} onDoubleClick={this.props.file.type !== 'dir' ? this.openLink.bind(this) : null}> {file.name}{getData()}</span>
          {selected ? this.getFileTools(file, {edit: true, delete: true, addlink: this.props.file.type === 'dir', info: true}) : null}
          {showInfo ? this.getInfoBox() : null}
          {showAddLink ? this.getAddLink() : null}
        </span>
      );
    }
  }
}
