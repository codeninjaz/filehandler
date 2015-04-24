import React from 'react';

export default class Fileitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChildren: props.showChildren
    }
  }
  handleClick(e) {
    e.stopPropagation();
    console.log(this.props.info.name + ' clicked');
    this.setState({
      showChildren: !this.state.showChildren
    })
  }
  handleDragOver(e) {
    e.preventDefault();
  }
  handleDragStart(info, e) {
    e.dataTransfer.setData('application/json', JSON.stringify(info));
    console.log('e', e);
  }
  handleDrop(info, e) {
    var obj = JSON.parse(e.dataTransfer.getData('application/json'));
    console.log('e.dataTransfer', obj);
    console.log('dropped on info', info);
  }
  getIndent(style) {
    style.paddingLeft = this.props.info.level * 10 + 'px';
  }
  renderChildren(item) {
    let children = [];
    if (item.items && item.items.length > 0) {
      _.forEach(item.items, function(child) {
        children.push(
          <Fileitem info={child}/>
        );
      });
    }
    return children;
  }
  render() {
    let info = this.props.info;
    let divStyle = {
      cursor:'pointer',
      backgroundColor: info.type === 'dir' ? '#FFFDAE' : '#D9FF93'
    };
    return (
      <div draggable={true} style={divStyle}
           onClick={this.handleClick.bind(this)}
           onDragStart={this.handleDragStart.bind(this, info)}
           onDragOver={this.handleDragOver.bind(this)}
           onDrop={this.handleDrop.bind(this, info)}
           >
        {this.getIndent(divStyle)}
        {info.name}: {info.type === 'dir' ? info.items.length : null}
        {this.state.showChildren ? this.renderChildren(info) : null}
      </div>
    );
  }
}
