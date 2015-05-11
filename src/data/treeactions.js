import McFly from 'McFly';
import Const from './fluxconstants';

let Flux = new McFly();

export default Flux.createActions({
  gotFiletreeData: function(actionData) {
    return actionData;
  },
  selectItem: function(file, data, multiple) {
    return {
      file       : file,
      id         : data.id,
      multiple   : multiple,
      actionType : Const.SELECT_ITEM
    }
  },
  deselectItem: function(file, data) {
    return {
      file      : file,
      id         : data.id,
      actionType: Const.DESELECT_ITEM
    }
  },
  deselectItems: function(data) {
    return {
      id         : data.id,
      actionType: Const.DESELECT_ITEMS
    }
  },
  openFolder: function(item, data) {
    return {
      item       : item,
      id         : data.id,
      actionType : Const.FOLDER_OPENED
    }
  },
  closeFolder: function(item, data) {
    return {
      item       : item,
      id         : data.id,
      actionType : Const.FOLDER_CLOSED
    }
  },
  startEditmode(item, data) {
    return {
      item       : item,
      id         : data.id,
      actionType : Const.EDITMODE
    }
  },
  addLinkTo(item, data) {
    return {
      item       : item,
      id         : data.id,
      actionType : Const.ADDLINKTO
    }
  },
  deleteItem(item) {
    return {
      item       : item,
      actionType : Const.DELETEITEM
    }
  },
  showInfo(item, data) {
    return {
      item       : item,
      id         : data.id,
      actionType : Const.SHOWINFO
    }
  },
  doneEditing(item, data) {
    return {
      item       : item,
      id         : data.id,
      actionType : Const.DONEEDITING
    }
  }
});
