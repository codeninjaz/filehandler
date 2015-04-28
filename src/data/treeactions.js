import McFly from 'McFly';
import Const from './fluxconstants';

let Flux = new McFly();

export default Flux.createActions({
  gotFiletreeData: function(actionData) {
    return actionData;
  },
  selectItem: function(file) {
    return {
      file: file,
      actionType: Const.SELECTED_ITEM
    }
  }
});
