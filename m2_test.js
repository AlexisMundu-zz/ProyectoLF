const alfabetoChars = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
					'Á', 'á', 'É', 'é', 'Í', 'í', 'Ó', 'ó', 'Ú', 'ú' ,
					'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 
					'&', '~', '$', ' ']);  //~ == \n
//$ == epsilon

const operadores = new Set([',', '+', '.', '*']);

let alphabet = '$';
let contEdos = 0;

const M2 = (postfija) => {
	alphabet = defineAlphabet(postfija,alphabet);
	let pilaAutomatas = [];
	let currChar = '';
	for (let i = 0; i < postfija.length; i++) {
		currChar = postfija.charAt(i);
		if(alfabetoChars.has(currChar)){
			pilaAutomatas.push(createCharTransition(currChar));
		}else{
			if(currChar === '.'){	
				let a2 = pilaAutomatas.pop();
				let a1 = pilaAutomatas.pop();
				pilaAutomatas.push(addConcat(a1,a2));
			}else if(currChar === '+'){
				pilaAutomatas.push(addCerraduraPositiva(pilaAutomatas.pop()));
			}else if(currChar === '*'){
				pilaAutomatas.push(addCerraduraKleene(pilaAutomatas.pop()));
			}
		}
	}
}

//crear dos estados nuevos para el caracter
const createCharTransition = (c) => {
	let automata = [];
	let primerEdo = createNvoEdo();
	let segundoEdo = createNvoEdo();
	let indexC = alphabet.indexOf(c);
	contEdos += 2;
	primerEdo[indexC] = contEdos - 1;
	automata.push(primerEdo);
	automata.push(segundoEdo);
	return automata;
}

const addCerraduraPositiva = (automata) => {
	automata.push(createNvoEdo());
	automata[1] = automata[0].slice(0);
	automata[1][0] = contEdos++;
	return automata;
}

const addCerraduraKleene = (automata) => {
	automata.push(createNvoEdo());
	automata[1] = automata[0].slice(0);
	for (let i = 1; i < alphabet.length; i++) {
		if(automata[0][i] != '/') automata[0][0] = automata[0][i];
		automata[0][i] = '/';
	}
	automata[1][0] = contEdos++;
	return automata;
}

const addConcat = (a1, a2) => {
	a1[a1.length - 1][0] = contEdos - a2.length;
	for (var i = 0; i < a2.length; i++) {
		a1.push(a2[i]);
	}
	return a1;
}

const createNvoEdo = () => {
	let automata = [];
	for (var i = 0; i < alphabet.length; i++) {
		automata[i] = '/';
	}
	return automata;
}

const defineAlphabet = (postfija, alphabet) => {    //DEFINE EL ALFABETO
    for(let i = 0; i< postfija.length; i++)
    {
        if(postfija[i] != '.' && postfija[i] != '*' && postfija[i] != '+' &&postfija[i] != ',' ){
            let pos = alphabet.indexOf(postfija[i]);
            if(pos == -1){
                //Si no hemos agregado ya el caracter al alfabeto, lo agregamos
                alphabet += postfija[i];
            }
        }
    }
    return alphabet;
}
M2("ab+.c*.");