import _ from 'lodash';
import Settings from '../settings.json';

export default {
  toOneDecimal(num) {
    return Math.round(num * 10) / 10;
  },
  getExtension(filename) {
    let result = ''
    let myregexp = /[.](.*)/im;
    let match = myregexp.exec(filename);
    if (match != null) {
      result = match[1];
    }
    return result;
  },
  getFileIcon(file) {
    let ext = this.getExtension(file.name);
    if (!ext) {ext = 'default';}
    let res = _.find(Settings.fileIcons, function(icon) {
      return _.includes(icon.types, ext);
    });
    if (res) {
      return res.icon;
    } else {
      return Settings.genericFileIcon;
    }
  },
  isSelected(item, selectedItem) {
    return item.id === selectedItem.id;
  }
}
