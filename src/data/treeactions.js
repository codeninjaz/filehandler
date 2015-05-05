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
  openFolder: function(item) {
    return {
      item        : item,
      actionType: Const.FOLDER_OPENED
    }
  },
  closeFolder: function(item) {
    return {
      item        : item,
      actionType: Const.FOLDER_CLOSED
    }
  },
  startEditmode(item) {
    return {
      item       : item,
      actionType : Const.EDITMODE
    }
  },
  setAddMode(item) {
    return {
      item       : item,
      actionType : Const.ADDMODE
    }
  },
  deleteItem(item) {
    return {
      item       : item,
      actionType : Const.DELETEITEM
    }
  },
  showInfo(item) {
    return {
      item       : item,
      actionType : Const.SHOWINFO
    }
  },
  doneEditing(item) {
    return {
      item       : item,
      actionType : Const.DONEEDITING
    }
  }
});
