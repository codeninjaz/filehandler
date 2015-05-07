import React              from 'react';
import FiletreeController from './components/filetreectrl';
import $                  from 'jquery'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<FiletreeController id={this.props.id}/>)
  }
}

$('.filehandler').each(function() {
  React.render(<App id={$(this).attr('data-id')}/>, $(this)[0]);
});
