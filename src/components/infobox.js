import React    from 'react';
import Util     from '../helpers/util';
import Actions  from '../data/treeactions';
import Settings from '../settings.json';

export default class Droparea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: ''
    };
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    Actions.showInfo(this.props.file);
  }
  openLink(e) {
    window.open(this.props.file.link, '_blank');
  }
  render() {
    let file     = this.props.file;
    let fileName = <div style={{fontWeight: 'bold'}}>{file.name}</div>;
    let linkUrl  = <div style={{fontWeight: 'bold'}} onClick={this.openLink.bind(this)}>{file.link}</div>;
    let fileSize = <div>{[Util.toOneDecimal(file.size / 1024) + 'KiB']}</div>;
    function getStyle() {
      return Settings.infobox.class ? null : Settings.infobox.style;
    }
    function getClass() {
      return Settings.infobox.class ? Settings.infobox.class : null;
    }
    console.log('file.parentId', file.parentId);
    if (file.id === 1) { //Rotsidan
      return (
        <div style={getStyle()} className={getClass()} onClick={this.handleClick.bind(this)}>
          <div style={{fontWeight: 'bold'}}>Rot</div>
          <div>{file.children.length} undersidor</div>
        </div>
      );
    } else { //Alla andra
      return (
        <div style={getStyle()} className={getClass()} onClick={this.handleClick.bind(this)}>
          {fileName}
          {this.props.file.type === 'link' ? linkUrl : null}
          {fileSize}
        </div>
      );
    }
  }
}
