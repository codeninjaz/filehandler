'use strict';

var _interopRequireWildcard = function(obj) { return obj && obj.__esModule ? obj : {'default': obj}; };

var _FS = require('fs');

var _FS2 = _interopRequireWildcard(_FS);

var _uuid = require('node-uuid');

var _uuid2 = _interopRequireWildcard(_uuid);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var words = 'lebowski ipsum donny was a good bowler and a good man he was he was one of us he was a man who loved the outdoors and bowling and as a surfer explored the beaches of southern california from redondo to calabassos and he was an avid bowler and a good friend he died—he died as so many of his generation before his time in your wisdom you took him lord as you took so many bright flowering young men at khe san and lan doc dolor sit amet consectetur adipiscing elit praesent ac magna';
var allWords = words.split(' ');

var getRandom = function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getAWord = function getAWord() {
  return allWords[getRandom(0, allWords.length - 1)];
};

var getDescription = function getDescription() {
  var max = getRandom(10, allWords.length - 1);
  var sentence = [];
  for (var n = 0; n < max; n++) {
    sentence.push(allWords[n]);
  }
  return sentence.join(' ');
};

var types = ['link', 'png', 'gif', 'jpg', 'pdf', 'zip', 'lha', 'gz', '7z', 'avi', 'mwv', 'mp4', 'mov', 'txt', 'js', 'cs', 'html', 'mp3', 'aif', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
var getAType = function getAType() {
  return types[getRandom(0, types.length - 1)];
};

var generateItems = function generateItems(mother) {
  var numChildren = getRandom(0, 20);
  for (var i = 0; i < numChildren; i++) {
    var _name = getAWord();
    var theType = getAType();
    var item = {
      name: _name + '.' + theType,
      id: _uuid2['default'].v4(),
      parentId: mother.id,
      type: theType,
      link: 'http://' + getAWord() + '.' + getAWord(),
      size: getRandom(100, 100000),
      children: []
    };
    mother.children.push(item);
    if (numChildren > 0) {
      mother.type = 'dir';
      mother.size = 0;
      mother.name = _name;
    }
  }
};

var filename = './filedata.json';
var root = {
  name: 'root',
  id: 1,
  parentId: '',
  type: 'root',
  children: []
};

var n = 1;
generateItems(root);
_import2['default'].forEach(root.children, function(child) {
  n += 1;
  generateItems(child);
  _import2['default'].forEach(child.children, function(child) {
    n += 1;
    generateItems(child);
    _import2['default'].forEach(child.children, function(child) {
      n += 1;
      generateItems(child);
    });
  });
});
console.log('Genererade ', n);
_FS2['default'].writeFile(filename, JSON.stringify(root, null, '\t'), function(err) {
  if (err) {
    throw err;
  }
  console.info(filename + ' skapad!');
});
