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

function moveFiles(movedItems, target) {
  console.log('movedItems', movedItems);
  console.log('target', target);
  if (movedItems && target) {
    foundItem = {};
    if (target.type === 'dir') {
      findInTree(items, target.id);
    } else {
      findInTree(items, target.parent);
    }
    foundItem.items.push(movedItems);
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
        status = Const.ADD_FILETREE_DATA;
        if (payload.node.type === 'dir') {
          findInTree(items, payload.node.id);
          addFiles(payload.files, foundItem);
        } else {
          findInTree(items, payload.node.parent);
          addFiles(payload.files, foundItem);
        }
        //Add files to treedata at selected node
        TreeStore.emitChange();
      break;
      case Const.MOVE_FILETREE_DATA:
        status = Const.MOVE_FILETREE_DATA;
        findInTree(items, payload.target.id);
        moveFiles(payload.movedItems, foundItem);
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
