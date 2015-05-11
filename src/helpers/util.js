import _ from 'lodash';
import Settings from '../settings.json';

export default {
  toOneDecimal(num) {
    return Math.round(num * 10) / 10;
  },
  getExtension(filename) {
    let result = '';
    let myregexp = /[.](.*)/im;
    let match = myregexp.exec(filename);
    if (match != null) {
      result = match[1];
    }
    return result;
  },
  getFileIcon(file) {
    let ext = file.type;
    if (!ext) {ext = 'default';}
    let res = _.find(Settings.fileIcons, function(icon) {
      return _.includes(icon.types, ext);
    });
    if (res) {
      return {
        icon: res.icon,
        color: res.color
      };
    } else {
      return {
        icon: Settings.genericFileIcon,
        color: '#000'
      };
    }
  },
  isSelected(item, data) {
    if (data.selectedItems) {
      return _.includes(data.selectedItems, item.id);
    }
  },
  isOpen(item, data) {
    if (data.openFolders) {
      return _.includes(data.openFolders, item.id);
    }
  },
  isShowingInfo(item, data) {
    if (data.showingInfo) {
      return data.showingInfo === item.id;
    }
  },
  isAddingLink(item, data) {
    if (data.addLinkTo) {
      return data.addLinkTo.id === item.id;
    }
  },
  removeSuffix(filename) {
    return filename.replace(/[.](.*)/img, '');
  }
}
