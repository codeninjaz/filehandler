import McFly from 'McFly';
import Const from './fluxconstants';
import _     from 'lodash';
import UUID  from 'node-uuid';

let Flux            = new McFly();
let treedata        = [];
let selectedItems   = [];
let openFolders     = [];
let editItem        = {};
let addLinkTo       = {};

var TreeStore = Flux.createStore(
  {
    getState: function() {
      return {
        data : {
          treedata      : treedata,
          status        : status,
          selectedItems : selectedItems,
          openFolders   : openFolders,
          editItem      : editItem,
          addLinkTo     : addLinkTo
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
      case Const.SELECT_ITEM:
        payload.file.selected = true;
        if (!payload.multiple) {
          selectedItems = [];
        }
        selectedItems.push(payload.file.id);
        TreeStore.emitChange();
      break;
      case Const.DESELECT_ITEM:
        payload.file.selected = false;
        _.remove(selectedItems, function(id) {
          return id === payload.file.id;
        });
        TreeStore.emitChange();
      break;
      case Const.DESELECT_ITEMS:
        selectedItems = [];
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
      case Const.ADDLINKTO:
        if (addLinkTo === payload.item) {
          addLinkTo = {};
        } else {
          addLinkTo = payload.item;
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
