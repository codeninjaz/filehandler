//Visar den inre informationen per fil.
import React from 'react';
import Util from '../helpers/util';
import Settings from '../settings.json';

export default class Fileinfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let file = this.props.file;
    let open = this.props.open;
    let selected = this.props.selected;

    function getData() {
      return file.size > 0 ? ' - ' + Util.toOneDecimal(file.size / 1024) + 'KiB' : null
    }
    function getIcon() {
      let self = this;
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
        fontWeight: selected ? 'bold' : 'normal'
      });
    }
    return (
            <span style={getStyle()}>
              <i className={'fa fa-' + getIcon(file)} />
              <span> {file.name}{getData()}</span>
            </span>
    );
  }
}
