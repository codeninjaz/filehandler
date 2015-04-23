import McFly from 'McFly';
import Const from './fluxconstants';

let Flux = new McFly();
let items = [];
let status = 'Init';

var TreeStore = Flux.createStore(
  {
    getState: function() {
      return {
        treedata: items,
        status: status
      };
    },
  },
  function(payload) {
    console.log('Treestore payload', payload);
    switch (payload.actionType){
      case Const.GET_FILETREE_DATA:
        items = payload.data;
        status = Const.GET_FILETREE_DATA;
        TreeStore.emitChange();
      break;
      case Const.PENDING:
        items = [];
        status = Const.PENDING;
        TreeStore.emitChange();
      break;
      case Const.ERROR:
        items = payload.errormsg;
        status = Const.ERROR;
        TreeStore.emitChange();
      break;
    }
  }
);

export default TreeStore;
