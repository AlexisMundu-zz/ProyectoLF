const readline = require('readline');

const alfabetoChars = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
					'Á', 'á', 'É', 'é', 'Í', 'í', 'Ó', 'ó', 'Ú', 'ú' ,'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '&', '~']); 

const operadores = new Set([',', '+', '.', '*']);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Expresión regular: ', (regExpr) => {
	let notPosfija = "";
	let pilaOperadores = [];
	let currChar = '';

	regExpr = addConcat(regExpr);
	console.log(regExpr);
	for (var i = 0; i < regExpr.length; i++) {
		currChar = regExpr.charAt(i);
		if(alfabetoChars.has(currChar)){
			notPosfija += currChar;
		}else if(currChar === '('){
			pilaOperadores.push(currChar);
		}else if(currChar === ')'){
			let peekPila = pilaOperadores.pop();
			while(peekPila != '('){
				notPosfija += peekPila;
				peekPila = pilaOperadores.pop();
			}
		}else if(operadores.has(currChar)){
			while(pilaOperadores.length > 0 && getPrecedence(pilaOperadores[pilaOperadores.length - 1]) >= getPrecedence(currChar)){
				notPosfija += pilaOperadores.pop();
			}
			pilaOperadores.push(currChar);
		}else{
			console.log("Error: el caracter " + currChar + " no es reconocido.");
		 	process.exit();
		}
	}

	while(pilaOperadores.length > 0){
		notPosfija += pilaOperadores.pop();
	}
	console.log("Notación postfija: " + notPosfija);
	process.exit();
	rl.close();
});


const addConcat = (txt) => {
	for(let i = 0; i < txt.length; i++) {
		if(alfabetoChars.has(txt.charAt(i)) && alfabetoChars.has(txt.charAt(i + 1)) ||
			operadores.has(txt.charAt(i)) && alfabetoChars.has(txt.charAt(i + 1)) ||
			alfabetoChars.has(txt.charAt(i)) && txt.charAt(i + 1) === '(' ||
			txt.charAt(i) === ')' && txt.charAt(i + 1) === '(') {
			txt = txt.substring(0, i + 1) + "." + txt.substring(i + 1);
			i++;
		}
	}
	return txt;
}

const getPrecedence = (c) => {
	switch(c){
		case ',': return 0;
		case '.': return 1;
		case '+': return 2;
		case '*': return 3;
		default: return -1;
	}
}