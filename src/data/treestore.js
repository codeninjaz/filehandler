import McFly from 'McFly';
import Const from './fluxconstants';
import _     from 'lodash';
import UUID  from 'node-uuid';

let Flux         = new McFly();
let FileItems    = [];
let status       = 'Init';
let selectedItem = {};
let openFolders  = [];
let editItem     = {};
let addToItem    = {};

var TreeStore = Flux.createStore(
  {
    getState: function() {
      return {
        treedata     : FileItems,
        status       : status,
        selectedItem : selectedItem,
        openFolders  : openFolders,
        editItem     : editItem
      };
    },
  },
  function(payload) {
    switch (payload.actionType){
      case Const.GET_FILETREE_DATA:
        FileItems = payload.data;
        TreeStore.emitChange();
      break;
      case Const.PENDING:
        FileItems = [];
        TreeStore.emitChange();
      break;
      case Const.ERROR:
        FileItems = payload.errormsg;
        TreeStore.emitChange();
      break;
      case Const.SELECTED_ITEM:
        selectedItem = payload.file;
        TreeStore.emitChange();
      break;
      case Const.FOLDER_OPENED:
        payload.item.open = true;
        openFolders.push(payload.item.id);
        TreeStore.emitChange();
      break;
      case Const.FOLDER_CLOSED:
        payload.item.open = false;
        _.remove(openFolders, function(id) {
          return id === payload.item.id;
        });
        TreeStore.emitChange();
      break;
      case Const.EDITMODE:
        if (editItem.length > 0 && editItem.id === payload.item.id) {
          editItem = {};
        } else {
          editItem = payload.item;
        }
        TreeStore.emitChange();
      break;
      case Const.ADDMODE:
        if (addToItem.length > 0 && addToItem.id === payload.item.id) {
          addToItem = {};
        } else {
          addToItem = payload.item;
        }
        TreeStore.emitChange();
      break;
      case Const.DONEEDITING:
        editItem = {};
        TreeStore.emitChange();
      break;
      case Const.DELETEITEM:
        payload.item = {};
        TreeStore.emitChange();
      break;
      case Const.SHOWINFO:
        if (payload.item.showInfo) {
          payload.item.showInfo = false;
        } else {
          payload.item.showInfo = true;
        }
        TreeStore.emitChange();
      break;
    }
  }
);

export default TreeStore;
