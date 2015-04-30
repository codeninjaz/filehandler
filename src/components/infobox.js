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
    let style = {
      position        :'absolute',
      top             :'0px',
      left            :'10px',
      backgroundColor : '#CCC',
      zIndex          : 10000,
      padding         : '10px',
      border          : 'solid 1px #333',
      boxShadow       : '5px 5px 5px 0px #EAEAEA'
    }
    function getInfo() {
      if (file) {
        return (
                <div style={style}>
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
https://trello.com