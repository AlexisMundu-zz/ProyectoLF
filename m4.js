'use strict'

// cadena ab
// alfabeto ab
// estado inicial 0
// estado final 2;
// transiciones [1;2;3] [1;2;3] // [2] [2;3] // [] [] // [] [2;3]

const val = [
  ['a','b'],
  ['a','b'],
  [0],
  [2],
  [ [[1,2,3], [1,2,3]], 
    [[2],[2,3]],
    [[null],[null]],
    [[null],[2,3]]
  ],
];

var AFNDtoAFD = (elements) => {
  const chain = elements[0];
  const alphabet = elements[1];
  const initialS = elements[2];
  const finalS = elements[3];
  const transitions = elements[4];
  var map = {};
  
  for(let i in transitions){
    map[i] = transitions[i];
  }

  let aux = [];

  for(let i of transitions){
    for(let j of i){
      if(!Object.keys(map).includes(j.join('')) && j[0] != null){ // add new states
        //map[j.join('')] = [];
        for(let k of j){
          console.log(k);
        }
        console.log();
      }
    }
  }

}

AFNDtoAFD(val);

module.exports = {
  AFNDtoAFD
};



