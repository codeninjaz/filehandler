import Const       from './fluxconstants';
import TreeActions from '../data/treeactions';
import Settings    from '../settings.json';

export default {
  getApiData: function() {
    //get data from API
    console.info('API: getApiData');
    $.getJSON(Settings.apiUrlBase + 'filedata')
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        })
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          actionType   : Const.ERROR
        })
      });
  },
  moveFile: function(file, target) {
    console.info('API: moveFile');
    console.log('file', file);
    console.log('target', target);
    let info = {
      'fileToMove' :file,
      'target'     : target
    };
    $.ajax({
        url    :Settings.apiUrlBase + 'movefile',
        method : 'POST',
        data   : info
      }).done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        })
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          actionType   : Const.ERROR
        })
      });
  },
  addFile: function(addedFiles, skippedFiles, target) {
    console.info('API: addFile');
    console.log('addedFiles', addedFiles);
    console.log('skippedFiles', skippedFiles);
    console.log('target', target);
    let info = {
      'filesToAdd':addedFiles,
      'target': target
    };
    $.ajax({
        url    :Settings.apiUrlBase + 'addfile',
        method : 'POST',
        data   : info
      })
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        })
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          actionType   : Const.ERROR
        })
      });
  },
  deleteFile: function(file) {
    console.info('API: deleteFile');
    console.log('file', file);
    let info = {
      'fileToDelete':file
    };
    $.getJSON(Settings.apiUrlBase + 'deletefile', info)
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data       : data,
          actionType : Const.GET_FILETREE_DATA
        })
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage : status + ' ' + error,
          actionType   : Const.ERROR
        })
      });
  }
}
