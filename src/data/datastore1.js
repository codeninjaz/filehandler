import McFly from 'McFly';
import Data from '../../test/menudata.json';

let Flux = new McFly();
let inventory = Data;
export default Flux.createStore(
  {
    getItems: function() {
      return inventory;
    }
  },
  function(payload) {
    console.log('payload', payload);
  }
);
