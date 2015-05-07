import React    from 'react';
import Settings from '../settings.json';
import API      from '../data/apicom';
import Actions  from '../data/treeactions';
import Util     from '../helpers/util';
import FileInfo from './fileinfo'

export default class Fileitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolsVisible: false
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleDragStart(info, e) {
    e.stopPropagation();
    if (!Util.isSelected(this.props.file, this.props.data.selectedItems)) {
      e.preventDefault();
    }
    console.log('this.props.data.selectedItems', this.props.data.selectedItems);
    e.dataTransfer.setData('application/json', JSON.stringify(this.props.data.selectedItems));
  }
  handleDrop(info, e) {
    console.log('handleDrop');
    console.log('info', info);
    var keptFiles = [];
    var skippedFiles = [];
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { //Droppade filer från lokal dator
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
    } else { //Droppade något annat än filer från lokal disk
      e.stopPropagation();
      var movedItem = JSON.parse(e.dataTransfer.getData('application/json'));
      API.moveFile(movedItem, info)
      Actions.deselectItems();
    }
  }
  getIndent(style) {
    style.paddingLeft = this.props.padding + 'px';
  }
  isOpen() {
    return _.includes(this.props.data.openFolders, this.props.file.id);
  }
  renderChildren(item) {
    //Rendera underliggande barn
    let self     = this;
    let children = [];
    if (item.children && item.children.length > 0) {
      _.forEach(item.children, function(child, i) {
        children.push(
          <Fileitem
            key     = {i}
            file    = {child}
            padding = {15}
            data    = {self.props.data}
          />
        );
      });
    }
    return (
      <ul style={{listStyle: 'none', padding: 0}}>
        {children}
      </ul>
    );
  }
  render() {
    let info       = this.props.file;
    let divStyle   = {
      cursor: 'pointer'
    };
    let open = this.isOpen();
    return (
      <li
        draggable    = {true}
        style        = {divStyle}
        onDragStart  = {this.handleDragStart.bind(this, info)}
        onDragOver   = {this.handleDragOver.bind(this)}
        onDrop       = {this.handleDrop.bind(this, info)}
        >
        {this.getIndent(divStyle)}
        <FileInfo
          data         = {this.props.data}
          file         = {info}
          open         = {open}
          toolsVisible = {this.state.toolsVisible}
        />
        {open ? this.renderChildren(info) : null}
      </li>
    );
  }
}
