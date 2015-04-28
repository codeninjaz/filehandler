import McFly from 'McFly';
import Const from './fluxconstants';
import _ from 'lodash';
import UUID from 'node-uuid';

let Flux = new McFly();
let FileItems = [];
let status = 'Init';
let foundItem = {};

var TreeStore = Flux.createStore(
  {
    getState: function() {
      return {
        treedata: FileItems,
        status: status
      };
    },
  },
  function(payload) {
    console.log('Treestore payload', payload);
    switch (payload.actionType){
      case Const.GET_FILETREE_DATA:
        FileItems = payload.data;
        status = Const.GET_FILETREE_DATA;
        TreeStore.emitChange();
      break;
      case Const.ADD_FILETREE_DATA:
        status = Const.ADD_FILETREE_DATA;
        if (payload.node.type === 'dir') {
          addFiles(payload.files, findFile(FileItems, payload.node.id));
        } else {
          addFiles(payload.files, findFile(FileItems, payload.node.parent));
        }
        //Add files to treedata at selected node
        TreeStore.emitChange();
      break;
      case Const.MOVE_FILETREE_DATA:
        status = Const.MOVE_FILETREE_DATA;
        let target = findFile(FileItems, payload.target.id);
        console.log('target', target);
        moveFiles(payload.movedItems, target);
        TreeStore.emitChange();
      break;
      case Const.PENDING:
        FileItems = [];
        status = Const.PENDING;
        TreeStore.emitChange();
      break;
      case Const.ERROR:
        FileItems = payload.errormsg;
        status = Const.ERROR;
        TreeStore.emitChange();
      break;
    }
  }
);

export default TreeStore;
