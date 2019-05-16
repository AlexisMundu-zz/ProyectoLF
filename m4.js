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
    [[],[]],
    [[],[2,3]]
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

  for(let i of transitions){
    for(let j of i){
      if(!Object.keys(map).includes(j.join('')) && j[0] != null){ // add new states
        let arrC = [];
        for(let w in alphabet){ // find transition in x,y
          let aux = new Set();
          for(let k of j){ // new state
              for(let z of transitions[k][w]){
                aux.add(z);
              }
          }
          arrC.push( [...aux].filter(x => x));
        }
        map[j.join('')] = arrC;
      }
    }
  }

  console.log(map);

}

var newStates = (transitions) => {

}

AFNDtoAFD(val);

module.exports = {
  AFNDtoAFD
};



