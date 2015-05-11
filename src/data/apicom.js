import Const       from './fluxconstants';
import TreeActions from '../data/treeactions';
import Settings    from '../settings.json';
import $           from 'jquery';

export default class ApiCom {
  constructor(url, did) {
    this.url = url;
    this.did = did;
  }
  getData(root) {
    //get data from API
    //transmit the root to the API to get the correct tree back
    let self = this;
    $.getJSON(this.url + 'filedata?root=' + root)
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          id         : self.did,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          id           : this.did,
          actionType   : Const.ERROR
        });
      });
  }
  moveFile(file, target) {
    let self = this;
    console.info('API: moveFile');
    console.log('file', file);
    console.log('target', target);
    let info = {
      'fileToMove' : file,
      'target'     : target
    };
    $.ajax({
        url    : this.url + 'movefile',
        method : 'POST',
        data   : info
      })
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          id         : self.did,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          id           : self.did,
          actionType   : Const.ERROR
        });
      });
  }
  addFile(addedFiles, skippedFiles, target) {
    let self = this;
    console.info('API: addFile');
    console.log('addedFiles', addedFiles);
    console.log('skippedFiles', skippedFiles);
    console.log('target', target);
    let info = {
      'filesToAdd' : addedFiles,
      'target'     : target
    };
    $.ajax({
        url    : this.url + 'addfile',
        method : 'POST',
        data   : info
      })
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          id         : self.did,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          id           : self.did,
          actionType   : Const.ERROR
        });
      });
  }
  createFolder(name, target) {
    //TODO: När man får svar tillbaka så ska den nya mappen sättas som "open", och även dess föräldrar
    //den nya kan också sättas som "selected" för att markera den
    console.log('API: createFolder');
    console.log('name', name);
  }
  createLink(name, url, target) {
    console.log('API: createLink');
    console.log('name', name);
    console.log('url', url);
    console.log('target', target);
  }
  renameFile(file, name) {
    console.info('API: renameFile');
    console.log('file', file);
    console.log('name', name);
  }
  deleteFiles(files) {
    let self = this;
    console.info('API: deleteFile');
    console.log('file', files);
    let info = {
      'filesToDelete': files
    };
    $.getJSON(this.url + 'deletefiles', info)
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          id         : self.did,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          id           : self.did,
          actionType   : Const.ERROR
        });
      });
  }
}
