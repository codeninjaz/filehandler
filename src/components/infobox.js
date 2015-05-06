import React from 'react';
import Util  from '../helpers/util';
import Actions  from '../data/treeactions';

export default class Droparea extends React.Component {

  constructor(props) {
    super(props);
    this.style = {
        position        : 'absolute',
        top             : '0px',
        left            : '10px',
        backgroundColor : '#CCC',
        zIndex          : 10000,
        padding         : '10px',
        border          : 'solid 1px #333',
        boxShadow       : '10px 10px 37px -2px rgba(165, 165, 165, 0.34)',
        opacity         : 0,
        transition      : 'all 1s'
      };
    this.state = {
      info: ''
    };
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    Actions.showInfo(this.props.file);
  }
  render() {
    let self = this;
    let file = this.props.file;
    let fileName = <span style={{fontWeight: 'bold'}}>{file.name}</span>;
    let linkUrl = <span style={{fontWeight: 'bold'}}>{file.link}</span>;
    let fileSize = <span>{[Util.toOneDecimal(file.size / 1024) + 'KiB']}</span>;
    if (file.parentId) {
      return (
        <div style={self.style} onClick={self.handleClick.bind(self)}>
          {fileName}<br/>
          {this.props.file.type === 'link' ? linkUrl : null}<br />
          {fileSize}
        </div>
      );
    } else {
      return (
        <div style={self.style} onClick={self.handleClick.bind(self)}>
          <span style={{fontWeight: 'bold'}}>Rot</span><br/>
          <span>{file.children.length} undersidor</span>
        </div>
      );
    }
  }
}
