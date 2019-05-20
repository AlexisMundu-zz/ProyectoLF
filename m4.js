  //M4. (20 puntos) Entrada: AFND Salida: AFD
//Entrada ejemplo

'use strict'

const alphabet = "ab";
const initialS = 0;
const finalS = "4";
const transitions =  [ 
  [[1,2,3], [4]], 
  [[1,2,3],[4]],
  [['/'],[4]],
  [['/'],[4]],
  [['/'],['/']]
];

// buscamos estados nuevos en las nuevas transiciones
// hasta que no existan nuevos estados iteramos
var newStates = (map,alphabet,transitions,finalS) =>{
  let arrayS = [];
  let flag = false;

  if(Object.keys(map).length != 0){
    arrayS.push(map[Object.keys(map)[0]]);// add initial state to array
  }

  for(let i=0;i<Object.keys(map).length;i++){ // buscamos en los estados de la tabla
    for(let j in map[Object.keys(map)[i]]){
      let trans = map[Object.keys(map)[i]][j];
      if(!Object.keys(map).includes(trans.join('')) && trans != '/' && trans != ''){
        let arrC = [];
        for(let w in alphabet){ // buscamos en el alfabeto
          let aux = new Set();
          for(let s of trans){
            for(let k of transitions[s][w]){
              if(k != '/'){
                aux.add(k);
              }else{
                flag = true;
              }
            }
          }
          if(aux.size == 0) aux.add('/'); // add '/' state
          arrC.push([...aux].filter(x => x));
        }
        arrayS.push(arrC);
        map[trans.join('')] = arrC;
      }
    }
  }

  if(flag){
    let arrC = [];
    for(let w in alphabet){
      arrC.push(['/']);
    }
    arrayS.push(arrC);
    map['/'] = arrC;
  }

  console.log(map);
  console.log(arrayS);

  // add final states 
  return map, finalS;
}

var AFNDtoAFD = (alphabet, initialS, finalS, transitions) => {
  alphabet = alphabet.split('');
  finalS = finalS.split('');
  var map = {};

  map[initialS] = transitions[initialS];
  
  newStates(map,alphabet,transitions,finalS);

  return alphabet, initialS, finalS, map;
}

AFNDtoAFD(alphabet, initialS, finalS, transitions);

module.exports = {
  AFNDtoAFD
};
