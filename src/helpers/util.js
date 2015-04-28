import _ from 'lodash';

let iconLookup = [
  {
    types:['png', 'gif', 'jpg'],
    icon:'file-image-o'
  },
  {
    types:['doc'],
    icon:'file-word-o'
  },
  {
    types:['pdf'],
    icon:'file-pdf-o'
  },
  {
    types:['folder'],
    icon:'folder-o'
  },
  {
    types:['txt'],
    icon:'file-o'
  },
]

export default {
  toOneDecimal: function(num) {
    return Math.round(num * 10) / 10;
  },
  getExtension: function(filename) {
    let result = ''
    let myregexp = /[.](.*)/im;
    let match = myregexp.exec(filename);
    if (match != null) {
      result = match[1];
    }
    return result;
  },
  getIcon(file) {
    if (file.type === 'dir') {
      return 'folder-o';
    }
    let ext = this.getExtension(file.name);
    console.log('ext', ext);
    if (!ext) {ext = 'default';}
    let res = _.find(iconLookup, function(icon) {
      return _.includes(icon.types, ext);
    });
    if (res) {
      return res.icon;
    }
    return '/images/icon_' + ext + '.png';
  }
}
