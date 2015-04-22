import React from 'react';
import _ from 'lodash';

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
    var droppedFiles = e.dataTransfer.files;
    var infotext = '';
    _.each(droppedFiles, function(file) {
      if (file.size <= self.props.settings.maxFileSize) {
        infotext += '\n' + file.name + ': ' + file.size + 'b';
      }
    });
    this.setState({
      info: infotext
    });
  }
  render() {
    return (
      <div style={this.props.settings.style}
      onDragOver={this.handleDragOver.bind(this)}
      onDrop={this.handleDrop.bind(this)}>
      Droparea: {this.state.info}
      </div>
      );
  }
}
