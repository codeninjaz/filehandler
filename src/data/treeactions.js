import McFly from 'McFly';
import Const from './fluxconstants';

let Flux = new McFly();

export default Flux.createActions({
  gotFiletreeData: function(actionData) {
    return actionData;
  },
  selectItem: function(file) {
    return {
      file      : file,
      actionType: Const.SELECTED_ITEM
    }
  },
  openFolder: function(id) {
    return {
      id        : id,
      actionType: Const.FOLDER_OPENED
    }
  },
  closeFolder: function(id) {
    return {
      id        : id,
      actionType: Const.FOLDER_CLOSED
    }
  },
  setEditmode(item) {
    return {
      item       : item,
      actionType : Const.EDITMODE
    }
  },
  doneEditing(item) {
    return {
      item       : item,
      actionType : Const.DONEEDITING
    }
  }
});
