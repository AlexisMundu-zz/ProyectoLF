//M6. (20 puntos) Entrada: AFN texto Salida: texto
//Entrada ejemplo

'use strict'

const fs = require('fs');
const MIN = 5; // Minimum entries for the AFD

var fileFormatter = (path) => {
  var content;
  try{
    content = fs.readFileSync(path, 'utf-8');
  }catch(err){
    return 'The path does not exist';
  }
  content = content.split(/\r?\n/); // format the new line, carriage return and EOF

  if(content.includes('')) return 'Verify the input fields';

  return content.length < MIN ?  'Introduce the minimum fields for the AFD' : content;
};

var entriesFormater = (entries) => {

  let chain = entries[0].split('').filter(x => x.trim()); // filter the white spaces
  let alphabet = entries[1].split(';').filter(x => x.trim()); // get an array of elements in the alphabet
  alphabet = alphabet.map(x => x.trim());
  let initialS = entries[2].trim();
  let finalS = entries[3].split(';').filter(x => x.trim());
  finalS = finalS.map(x => x.trim());
  let transition = entries.slice(4,entries.length);
  transition = transition.map( x => x.split(';').filter(x => x.trim()));
  transition = transition.map(x => x.map(y => y.trim())); // delete spaces foreach transition

  let alpcheck = alphabet.map(x => (/^[^a-zA-Z0-9]+$/).test(x)); // verify the alphabet elements
  if(alpcheck.includes(true)) return 'Verify your alphabet';

  let chain_elements = [...(new Set(chain))];
  const val = chain_elements.map(x => alphabet.includes(x));

  if(val.includes(false)) return 'Verify the elements of your chain with your alphabet';

  return [chain, alphabet, initialS, finalS, transition];
}

var AFDlogic = (elements) => {
  let chain = elements[0]; //  FIFO 
  let alphabet = elements[1]; // alphabet
  let state = elements[2]; // initialS
  let transition = elements[4]; // transition
  let ans = [];
  let lastState = 0;

  for(let i of chain){
    ans.push(state + '/');
    if(transition[state] === undefined ) return false;
    state = transition[state][alphabet.indexOf(i)];  // find in the table 
  }
  
  lastState = state;
  ans.push(state + '/');
  return true;
}

var AFD = (path) => {
  let result = fileFormatter(path);
  let elements;
  let ans;

  if(Array.isArray(result)){
    elements = entriesFormater(result);
  }else{
    console.log(result);
    return 0;
  }
  
  return AFDlogic(elements);
}

let path = process.argv[2];

let ChainValidator = (elements) => {
  //Validamos las cadenas
  AFD(path);
  // Las agregamos a un archivo de texto

}

ChainValidator(path);
