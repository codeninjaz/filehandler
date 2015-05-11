import McFly from 'McFly';
import Const from './fluxconstants';
import _     from 'lodash';
import UUID  from 'node-uuid';

let Flux          = new McFly();

export default class FileHandlerStore {
  GetTreeStore() {
    let TreeStore = Flux.createStore(
      {
        storeState: {
          treedata      : [],
          selectedItems : [],
          openFolders   : [],
          editItem      : {},
          addLinkTo     : {},
          showingInfo   : -1
        },
        getState: function() {
          return {
            data : {
              treedata      : TreeStore.storeState.treedata,
              selectedItems : TreeStore.storeState.selectedItems,
              openFolders   : TreeStore.storeState.openFolders,
              editItem      : TreeStore.storeState.editItem,
              addLinkTo     : TreeStore.storeState.addLinkTo,
              showingInfo   : TreeStore.storeState.showingInfo,
              id            : this.dispatcherID
            }
          };
        },
      },
      function(payload) {
        let myStoreState = TreeStore.storeState
        switch (payload.actionType){
          case Const.GET_FILETREE_DATA:
            myStoreState.treedata = payload.data;
            TreeStore.emitChange();
          break;
          case Const.PENDING:
            myStoreState.treedata = [];
            TreeStore.emitChange();
          break;
          case Const.ERROR:
            myStoreState.treedata = payload.errormsg;
            TreeStore.emitChange();
          break;
          case Const.SELECT_ITEM:
            if (TreeStore.dispatcherID === payload.id) {
              if (!payload.multiple) {
                myStoreState.selectedItems = [];
              }
              myStoreState.selectedItems.push(payload.file.id);
              TreeStore.emitChange();
            }
          break;
          case Const.DESELECT_ITEM:
            if (TreeStore.dispatcherID === payload.id) {
              _.remove(myStoreState.selectedItems, function(id) {
                return id === payload.file.id;
              });
              TreeStore.emitChange();
            }
          break;
          case Const.DESELECT_ITEMS:
            myStoreState.selectedItems = [];
            TreeStore.emitChange();
          break;
          case Const.FOLDER_OPENED:
            if (TreeStore.dispatcherID === payload.id) {
              myStoreState.openFolders.push(payload.item.id);
              TreeStore.emitChange();
            }
          break;
          case Const.FOLDER_CLOSED:
            if (TreeStore.dispatcherID === payload.id) {
              _.remove(myStoreState.openFolders, function(id) {
                return id === payload.item.id;
              });
              TreeStore.emitChange();
            }
          break;
          case Const.EDITMODE:
            if (TreeStore.dispatcherID === payload.id) {
              myStoreState.editItem = payload.item;
              TreeStore.emitChange();
            }
          break;
          case Const.ADDLINKTO:
            if (TreeStore.dispatcherID === payload.id) {
              if (myStoreState.addLinkTo === payload.item) {
                myStoreState.addLinkTo = {};
              } else {
                myStoreState.addLinkTo = payload.item;
              }
              TreeStore.emitChange();
            }
          break;
          case Const.DONEEDITING:
            myStoreState.editItem = {};
            TreeStore.emitChange();
          break;
          case Const.DELETEITEM:
            payload.item = {};
            TreeStore.emitChange();
          break;
          case Const.SHOWINFO:
            if (TreeStore.dispatcherID === payload.id) {
              if (myStoreState.showingInfo === payload.item.id) {
                myStoreState.showingInfo = -1;
              } else {
                myStoreState.showingInfo = payload.item.id;
              }
              TreeStore.emitChange();
            }
          break;
        }
      }
    );

    return TreeStore;
  }
}
