import React from 'react';
import Settings from '../settings.json';
import API from '../data/apicom';
import Util from '../helpers/util';
import FileInfo from './fileinfo'

export default class Fileitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChildren: props.showChildren
    }
  }
  handleClick(e) {
    e.stopPropagation();
    console.log('this', this);
    this.setState({
      showChildren: !this.state.showChildren
    })
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
      console.log('e.dataTransfer.files', e.dataTransfer.files);
      e.preventDefault();
      e.stopPropagation();
      _.each(e.dataTransfer.files, function(file) {
        if (file.size > Settings.maxFileSize) {
          file.reason = 'size';
          skippedFiles.push(file);
        } else if (!_.includes(Settings.allowedFileExtensions, Util.getExtension(file.name))) {
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
    style.paddingLeft = this.props.info.level * 10 + 'px';
  }
  renderChildren(item) {
    let children = [];
    if (item.children && item.children.length > 0) {
      _.forEach(item.children, function(child, i) {
        children.push(
          <Fileitem key={i} info={child}/>
        );
      });
    }
    return children;
  }
  render() {
    let info = this.props.info;
    let divStyle = {
      cursor:'pointer'
    };
    return (
      <div draggable={true} style={divStyle}
           onClick={this.handleClick.bind(this)}
           onDragStart={this.handleDragStart.bind(this, info)}
           onDragOver={this.handleDragOver.bind(this)}
           onDrop={this.handleDrop.bind(this, info)}
           >
        {this.getIndent(divStyle)}
        <FileInfo file={info} open={this.state.showChildren}/>
        {this.state.showChildren ? this.renderChildren(info) : null}
      </div>
    );
  }
}
