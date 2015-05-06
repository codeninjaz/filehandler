import Const       from './fluxconstants';
import TreeActions from '../data/treeactions';
import Settings    from '../settings.json';
import $           from 'jquery';

export default class API {
  getData() {
    //get data from API
    console.info('API: getData');
    $.getJSON(Settings.apiUrlBase + 'filedata')
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          actionType   : Const.ERROR
        });
      });
  }
  moveFile(file, target) {
    console.info('API: moveFile');
    console.log('file', file);
    console.log('target', target);
    let info = {
      'fileToMove' : file,
      'target'     : target
    };
    $.ajax({
        url    : Settings.apiUrlBase + 'movefile',
        method : 'POST',
        data   : info
      })
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          actionType   : Const.ERROR
        });
      });
  }
  addFile(addedFiles, skippedFiles, target) {
    console.info('API: addFile');
    console.log('addedFiles', addedFiles);
    console.log('skippedFiles', skippedFiles);
    console.log('target', target);
    let info = {
      'filesToAdd': addedFiles,
      'target': target
    };
    $.ajax({
        url    : Settings.apiUrlBase + 'addfile',
        method : 'POST',
        data   : info
      })
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
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
  deleteFiles(files) {
    console.info('API: deleteFile');
    console.log('file', files);
    let info = {
      'filesToDelete': files
    };
    $.getJSON(Settings.apiUrlBase + 'deletefiles', info)
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        });
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          actionType   : Const.ERROR
        });
      });
  }
}
