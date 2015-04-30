import FS from 'fs';
import uuid from 'node-uuid';
import _ from 'lodash';

var words = 'lorem ipsum dolor sit amet consectetur adipiscing elit aenean massnibh donec lacinidiam ut porttitor facilisis nunc vestibulum mollis urnvel posuere ligulporttitor quis pellentesque sit amet tincidunt lorem phasellus aliquam pellentesque magnid ultrices sapien feugiat ut donec eu lobortis risus quis dapibus risus phasellus varius leo mi quis faucibus ex sagittis sed fusce in iaculis ligulcurabitur tincidunt nullnisl at finibus odio egestas nec cras aliquam laciniest eget tempus cras interdum erat ante mollis tempor nullam convallis egestas dolor in imperdiet justo viverrsed sed semper purus id pretium sollicitudin integer lobortis aliquam nunc vitae rutrum nunc laciniaugue mauris eu cursus erat mollis ac nunc dictum ultricies nibh eu tristique nunc molestie id maecenas nec orci vel lorem cursus tempor praesent vestibulum tellus enim in molestie massornare aliquam nullex est facilisis vitae purus sit amet pharetrultricies velit sed euismod nullsit amet ornare condimentum fusce sodales mauris dolor sed dignissim est gravidtristique cras lectus nullmattis non condimentum eu egestas in dui donec bibendum purus ligulnec sagittis velit commodo at curabitur et sem consectetur ullamcorper turpis in imperdiet nunc aenean varius ullamcorper ipsum nam velit ex vestibulum vel consectetur et ultricies at justo pellentesque ac tortor ultrices dignissim turpis sit amet egestas metus duis aliquam tellus vel leo molestie non ultricies risus scelerisque fusce nulldolor auctor sit amet felis eleifend dictum suscipit ligulaliquam pharetrfeugiat urnvel molestie risus finibus eget morbi imperdiet elit vitae masstristique sit amet blandit orci tempor integer hendrerit justo nibh nec blandit ex tincidunt sed';
var allWords = words.split(' ');

var getRandom = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getAWord = function() {
  return allWords[getRandom(0, allWords.length - 1)];
};

var getDescription = function() {
  var max = getRandom(10, allWords.length - 1);
  var sentence = [];
  for (var n = 0; n < max; n++) {
    sentence.push(allWords[n]);
  }
  return sentence.join(' ');
};

var types = ['png', 'gif', 'jpg', 'pdf', 'zip', 'lha', 'gz', '7z', 'avi', 'mwv', 'mp4', 'mov', 'txt', 'js', 'cs', 'html', 'mp3', 'aif', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
var getAType = function() {
  return types[getRandom(0, types.length - 1)];
}

var generateItems = function(mother) {
  let numChildren = getRandom(0, 20);
  for (var i = 0; i < numChildren; i++) {
    let name = getAWord();
    let theType = getAType();
    var item = {
      name    : name + '.' + theType,
      id      : uuid.v4(),
      parentId: mother.id,
      type    : theType,
      size    : getRandom(100, 100000),
      children: []
    };
    mother.children.push(item);
    if (numChildren > 0) {
      mother.type = 'dir';
      mother.size = 0;
      mother.name = name;
    }
  }
}

var filename = './filedata.json';
var root = {
  name    : 'root',
  id      : 1,
  parentId: '',
  type    : 'root',
  children: []
}

let n = 1;
generateItems(root);
_.forEach(root.children, function(child) {
  n += 1;
  generateItems(child);
  _.forEach(child.children, function(child) {
    n += 1;
    generateItems(child);
    _.forEach(child.children, function(child) {
      n += 1;
      generateItems(child);
    });
  });
});
console.log('Genererade ', n);
FS.writeFile(filename, JSON.stringify(root, null, '\t'), function(err) {
  if (err) {
    throw err;
  }
  console.info(filename + ' skapad!');
});
