//Visar den inre informationen per fil.
import React     from 'react';
import Util      from '../helpers/util';
import Settings  from '../settings.json';
import FileTools from './filetools';
import InfoBox   from './infobox';
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

  render() {
    let self     = this;
    let file     = this.props.file;
    let selected = Util.isSelected(file, this.props.data.selectedItem);
    let editing  = this.props.data.editItem ? this.props.data.editItem.id === file.id : false;
    let open     = this.props.open;
    let showInfo = this.props.file.showInfo;

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
        position: 'relative'
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
          <span> rot</span>
          {selected ? this.getFileTools(file, {add:true, info: true}) : null}
          {showInfo ? this.getInfoBox() : null}
        </span>
      );
    }
    if (editing) {
      return (
        <span style={getEditStyle()}>
          <i className={'fa fa-' + getIcon(file)} />
          {this.getFileTools(file, {done: true})}
        </span>
      )
    } else {
      return (
        <span style={getStyle()}>
          <i className={'fa fa-' + getIcon(file)} />
          <span> {file.name}{getData()}</span>
          {selected ? this.getFileTools(file, {edit: true, delete: true, add:true, info: true}) : null}
          {showInfo ? this.getInfoBox() : null}
        </span>
      );
    }
  }
}
