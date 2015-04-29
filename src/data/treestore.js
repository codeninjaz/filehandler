import McFly from 'McFly';
import Const from './fluxconstants';
import _     from 'lodash';
import UUID  from 'node-uuid';

let Flux         = new McFly();
let FileItems    = [];
let status       = 'Init';
let selectedItem = {};
let openFolders  = [];
let editItem     = {}

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
        if (!_.includes(openFolders, payload.id)) {
          openFolders.push(payload.id);
          TreeStore.emitChange();
        }
      break;
      case Const.FOLDER_CLOSED:
        if (_.includes(openFolders, payload.id)) {
          _.remove(openFolders, function(id) {
            return id === payload.id
          });
          TreeStore.emitChange();
        }
      break;
      case Const.EDITMODE:
        if (editItem.length > 0 && editItem.id === payload.item.id) {
          editItem = {};
        } else {
          editItem = payload.item;
        }
        TreeStore.emitChange();
      break;
      case Const.DONEEDITING:
        editItem = {};
        TreeStore.emitChange();
      break;
    }
  }
);

export default TreeStore;
