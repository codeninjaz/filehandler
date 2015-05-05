import React    from 'react';
import Settings from '../settings.json';
import API      from '../data/apicom';
import Actions  from '../data/treeactions';
import Util     from '../helpers/util';
import FileInfo from './fileinfo'

export default class Fileitem extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(e) {
    e.stopPropagation();
    Actions.selectItem(this.props.info);
    if (!this.props.info.parentId) {
      return;
    }
    if (this.props.info.open) {
      Actions.closeFolder(this.props.info);
    } else {
      Actions.openFolder(this.props.info);
    }
  }
  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleDragStart(info, e) {
    e.stopPropagation();
    e.dataTransfer.setData('application/json', JSON.stringify(info));
  }
  handleDrop(info, e) {
    var keptFiles = [];
    var skippedFiles = [];
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { //Droppade filer
      e.preventDefault();
      e.stopPropagation();
      _.each(e.dataTransfer.files, function(file) {
        if (file.size > Settings.maxFileSize) {
          file.reason = 'size';
          skippedFiles.push(file);
        } else if (!_.includes(Settings.allowedFileExtensions, file.type)) {
          file.reason = 'type';
          skippedFiles.push(file);
        } else {
          keptFiles.push(file);
        }
      });
      API.addFile(keptFiles, skippedFiles, info);
    } else { //Droppade något annat än filer
      e.stopPropagation();
      var movedItem = JSON.parse(e.dataTransfer.getData('application/json'));
      API.moveFile(movedItem, info)
    }
  }
  getIndent(style) {
    style.paddingLeft = this.props.padding + 'px';
  }
  isOpen() {
    return _.includes(this.props.openFolders, this.props.info.id);
  }
  renderChildren(item) {
    //Rendera underliggande barn
    let self     = this;
    let children = [];
    if (item.children && item.children.length > 0) {
      _.forEach(item.children, function(child, i) {
        children.push(
          <Fileitem
            key          = {i}
            info         = {child}
            padding      = {15}
            selectedItem = {self.props.selectedItem}
            editItem     = {self.props.editItem}
            openFolders  = {self.props.openFolders}
          />
        );
      });
    }
    return (
      <ul style={{listStyle:'none', padding:0}}>
        {children}
      </ul>
    );
  }
  render() {
    let info       = this.props.info;
    let isSelected = Util.isSelected(info, this.props.selectedItem);
    let editMode   = this.props.editItem ? this.props.editItem.id === info.id : false;
    let divStyle   = {
      cursor:'pointer'
    };
    let open = this.isOpen();
    return (
      <li
        draggable   = {true}
        style       = {divStyle}
        onClick     = {this.handleClick.bind(this)}
        onDragStart = {this.handleDragStart.bind(this, info)}
        onDragOver  = {this.handleDragOver.bind(this)}
        onDrop      = {this.handleDrop.bind(this, info)}
        >
        {this.getIndent(divStyle)}
        <FileInfo
          file     = {info}
          selected = {isSelected}
          editing  = {editMode}
          itemKey  = {'itemKey'}
          open     = {open}
        />
        {open ? this.renderChildren(info) : null}
      </li>
    );
  }
}
