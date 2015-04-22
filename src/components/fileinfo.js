import React from 'react';
import Util from '../helpers/util';

export default class Fileinfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var file = this.props.file;
    return (
            <tr>
              <td>{file.name}</td>
              <td>{file.type}</td>
              <td>{Util.toOneDecimal(file.size / 1024)} KiB</td>
            </tr>
    );
  }
}
