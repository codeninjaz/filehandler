import Const from './fluxconstants';
import TreeActions from '../data/treeactions'

export default {
  getApiData: function() {
    //get data from API
    $.getJSON('http://localhost:8099/filedata')
      .done(function(data) {
        TreeActions.gotFiletreeData({
          data: data,
          actionType: Const.GET_FILETREE_DATA
        })
      })
      .fail(function(data, status, error) {
        TreeActions.gotFiletreeData({
          errormessage: status + ' ' + error,
          actionType: Const.ERROR
        })
      });
  }
}
