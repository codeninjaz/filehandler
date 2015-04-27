import McFly from 'McFly';
import Const from './fluxconstants';
import _ from 'lodash';

let Flux = new McFly();
let items = [];
let status = 'Init';

function findInTree(tree, name) {
  console.log('tree.items', tree ? tree.items : '----');
  if (tree) {
    _.forEach(tree, function(item) {
      findInTree(item.items, '');
    });
  }
}

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
      case Const.ADD_FILETREE_DATA:
        payload.files;
        status = Const.ADD_FILETREE_DATA;
        let foundItem = findInTree(items, payload.node.name)
        console.log('foundItem', foundItem);
        if (payload.node.type === 'dir') {
          console.log('Treestore: Filer droppade på katalog');
        } else {
          console.log('Treestore: Filer droppade på fil');
        }
        //Add files to treedata at selected node
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
