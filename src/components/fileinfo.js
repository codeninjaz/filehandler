import React from 'react';
import Util from '../helpers/util';

export default class Fileinfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var file = this.props.file;
    var open = this.props.open;
    function getData() {
      return file.size > 0 ? ' - ' + Util.toOneDecimal(file.size / 1024) + 'KiB' : null
    }
    function getIcon() {
      let self = this;
      if (file.type === 'dir') {
        if (open) {
          return 'folder-open-o'
        }else {
          return 'folder-o'
        }
      }
      return Util.getIcon(file)
    }
    return (
            <span>
              <i className={'fa fa-' + getIcon(file)} />
              <span> {file.name}{getData()}</span>
            </span>
    );
  }
}
