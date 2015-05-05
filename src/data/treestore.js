import McFly from 'McFly';
import Const from './fluxconstants';
import _     from 'lodash';
import UUID  from 'node-uuid';

let Flux         = new McFly();
let treedata     = [];
let selectedItem = {};
let openFolders  = [];
let editItem     = {};
let addToItem    = {};

var TreeStore = Flux.createStore(
  {
    getState: function() {
      return {
        data : {
          treedata     : treedata,
          status       : status,
          selectedItem : selectedItem,
          openFolders  : openFolders,
          editItem     : editItem
        }
      };
    },
  },
  function(payload) {
    switch (payload.actionType){
      case Const.GET_FILETREE_DATA:
        treedata = payload.data;
        TreeStore.emitChange();
      break;
      case Const.PENDING:
        treedata = [];
        TreeStore.emitChange();
      break;
      case Const.ERROR:
        treedata = payload.errormsg;
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
        editItem = payload.item;
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
