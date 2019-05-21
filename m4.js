  //M4. (20 puntos) Entrada: AFND Salida: AFD
//Entrada ejemplo

'use strict'

const alphabet = "01";
const initialS = 0;
const finalS = "3";
const transitions =  [ 
  [[1,2,3], [4]], 
  [[1,2,3], [4]],
  [['/'],[4]],
  [['/'],[4]],
  [['/'],['/']]
];

// buscamos estados nuevos en las nuevas transiciones
// hasta que no existan nuevos estados iteramos
var newStates = (map,alphabet,transitions,finalS) =>{
  let arrayS = [];
  let statesOrder = [];
  let flag = false;

  if(Object.keys(map).length != 0){
    arrayS.push(map[Object.keys(map)[0]]);// Agregamos el estado inicial al arreglo
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
          if(aux.size == 0) aux.add('/'); // Agregamos el estado de error '/' 
          arrC.push([...aux].filter(x => x));
        }
        arrayS.push(arrC);
        statesOrder.push(trans.join(''));
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

  let finalSaux = [];

  for(let i of Object.keys(map)){
    for(let j of finalS){
      if(i.split('').includes(j)){
        finalSaux.push(i);
      }
    }
  }

  for(let i in arrayS){
    for(let w in alphabet){
      if(arrayS[i][w].join('') != '/'){
        arrayS[i][w] = statesOrder.indexOf(arrayS[i][w].join('')) + 1;
      }else{
        arrayS[i][w] = statesOrder.length + 1;
      }
    }
  }

  for(let i in finalSaux){
    finalSaux[i] = statesOrder.indexOf(finalSaux[i]) + 1;
  }

  console.log('Estados finales:', finalSaux); // estados finales
  console.log(map); // tabla con etiquetas
  console.log(arrayS); // tabla sin etiquetas

  // add final states 
  return [arrayS, finalSaux];
}

var AFNDtoAFD = (alphabet, initialS, finalS, transitions) => {
  alphabet = alphabet.split('');
  finalS = finalS.split('');
  var map = {};

  map[initialS] = transitions[initialS];
  
  let ans = newStates(map,alphabet,transitions,finalS);

  map = ans[0];
  finalS = ans[1];

  return [alphabet, initialS, finalS, map];
}

AFNDtoAFD(alphabet, initialS, finalS, transitions);

module.exports = {
  AFNDtoAFD
};
