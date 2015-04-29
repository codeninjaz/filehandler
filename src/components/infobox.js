import React from 'react';
import Util  from '../helpers/util';

export default class Droparea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:''
    }
  }
  render() {
    let file = this.props.file
    function getInfo() {
      if (file) {
        return (
                <div>
                  <span style={{fontWeight:'bold'}}>{file.name}</span><br/>
                  <span>{[Util.toOneDecimal(file.size / 1024) + 'KiB']}</span>
                </div>
              );
      } else {
        return null;
      }
    }
    return (getInfo());
  }
}
