import McFly from 'McFly';
import Const from './fluxconstants';
import _ from 'lodash';
import UUID from 'node-uuid';

let Flux = new McFly();
let FileItems = [];
let status = 'Init';
let selectedItem = {};

var TreeStore = Flux.createStore(
  {
    getState: function() {
      return {
        treedata: FileItems,
        status: status,
        selectedItem: selectedItem
      };
    },
  },
  function(payload) {
    switch (payload.actionType){
      case Const.GET_FILETREE_DATA:
        FileItems = payload.data;
        // status = Const.GET_FILETREE_DATA;
        TreeStore.emitChange();
      break;
      case Const.PENDING:
        FileItems = [];
        // status = Const.PENDING;
        TreeStore.emitChange();
      break;
      case Const.ERROR:
        FileItems = payload.errormsg;
        // status = Const.ERROR;
        TreeStore.emitChange();
      break;
      case Const.SELECTED_ITEM:
        selectedItem = payload.file;
        TreeStore.emitChange();
      break;
    }
  }
);

export default TreeStore;
