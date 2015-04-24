import McFly from 'McFly';
import Const from './fluxconstants';

let Flux = new McFly();

export default Flux.createActions({
  gotFiletreeData: function(actionData) {
    return actionData;
  },
  addFiles: function(files, node) {
    return {
      actionType: Const.ADD_FILETREE_DATA,
      files: files,
      node: node
    }
  }
});
