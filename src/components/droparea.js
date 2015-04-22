import React from 'react';
import FileInfo from './fileinfo';
import Util from '../helpers/util';
import _ from 'lodash';
import Settings from '../settings.json';

export default class Droparea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:''
    }
  }
  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleDrop(e) {
    var self = this;
    e.stopPropagation();
    e.preventDefault();
    var droppedFiles = [];
    _.each(e.dataTransfer.files, function(file) {
      if (file.size <= Settings.maxFileSize) {
        droppedFiles.push(file);
      }
    });
    this.setState({
      files: droppedFiles
    });
  }
  render() {
    var self      = this;
    var fileCells = [];
    var droppedInfo   = null;
    if (this.state.files) {
      droppedInfo = <span>Släppte: {this.state.files.length} filer<br/></span>
      _.each(this.state.files, function(file, i) {
        fileCells.push(
            <FileInfo key={i} file={file} />
          )
      });
    }
    var divStyle = Settings.style;
    divStyle.overflow = 'auto';
    var kbSize = Util.toOneDecimal(Settings.maxFileSize / 1024);
    return (
      <div style      ={divStyle}
           onDragOver ={this.handleDragOver.bind(this)}
           onDrop     ={this.handleDrop.bind(this)}>
        Släpp filer här<br/>
        Max {kbSize} KiB per fil<br/>
        {droppedInfo}
        <table>
          {fileCells}
        </table>
      </div>
      );
  }
}
