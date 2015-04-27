import McFly from 'McFly';
import Const from './fluxconstants';
import _ from 'lodash';
import UUID from 'node-uuid';

let Flux = new McFly();
let items = [];
let status = 'Init';
let foundItem = {};

function findInTree(tree, id) {
  if (tree) {
    _.forEach(tree, function(item) {
      if (item.id === id) {
        foundItem = item;
      }
      findInTree(item.items, id);
    });
  }
}

function getExtension(name) {
  let myregexp = /[.](.*)/im;
  let result = '';
  let match = myregexp.exec(name);
  if (match != null) {
    result = match[1];
  }
  return result;
}

function addFiles(files, item) {
  if (files && item) {
    console.log('files', files);
    console.log('item', item);
    console.log('item.items', item.items);
    _.forEach(files, function(file) {
      item.items.push(
        {
          name  : file.name,
          id    : UUID.v4(),
          parent: item.id,
          type  : getExtension(item.name),
          size  : file.size,
          level : item.level + 1
        }
        );
    });
  }
}

/*
  "name"  : "file1.txt",
  "id"    : "9161c41e-7e44-48ce-9e6e-9d6aadad40f9",
  "parent": "2532baab-ff32-4f41-8a3c-fbcdf9a9060a",
  "path"  : "/dir1/",
  "type"  : "text",
  "size"  : 12300,
  "level" : 1
*/

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
        if (payload.node.type === 'dir') {
          console.log('Treestore: Filer släppta på katalog');
          findInTree(items, payload.node.id);
          addFiles(payload.files, foundItem);
        } else {
          console.log('Treestore: Filer släppta på fil');
          findInTree(items, payload.node.parent);
          addFiles(payload.files, foundItem);
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
