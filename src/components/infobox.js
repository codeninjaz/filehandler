import React from 'react';
import Util  from '../helpers/util';
import Actions  from '../data/treeactions';

export default class Droparea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info:'',
      style: {
        position        :'absolute',
        top             :'0px',
        left            :'10px',
        backgroundColor : '#CCC',
        zIndex          : 10000,
        padding         : '10px',
        border          : 'solid 1px #333',
        boxShadow       : '10px 10px 37px -2px rgba(165, 165, 165, 0.34)',
        opacity : 0,
        transition      : 'all 1s'
      }
    }
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    Actions.showInfo(this.props.file);
  }
  componentDidMount() {
    let st = this.state.style;
    st.opacity = 1;
    this.setState({
        style: st
      })
  }
  componentWillUnmount() {
      let st = this.state.style;
      st.opacity = 0;
      this.setState({
        style: st
      })
    }
  render() {
    let self = this;
    let file = this.props.file;
    return (
      <div style={self.state.style} onClick={self.handleClick.bind(self)}>
        <span style={{fontWeight:'bold'}}>{file.name}</span><br/>
        <span>{[Util.toOneDecimal(file.size / 1024) + 'KiB']}</span>
      </div>
    );
  }
}
