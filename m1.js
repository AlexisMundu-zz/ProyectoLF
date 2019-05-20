const alfabetoChars = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
					'Á', 'á', 'É', 'é', 'Í', 'í', 'Ó', 'ó', 'Ú', 'ú' ,
					'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 
					'&', '~', '$', ' ']);  //~ == \n
//$ == epsilon

const operadores = new Set([',', '+', '.', '*']);


const M1 = (regExpr) => {
	let notPosfija = "";
	let pilaOperadores = [];
	let currChar = '';

	regExpr = addConcat(regExpr);
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
};


const addConcat = (txt) => {
	let currChar = '';
	let nextChar = '';
	for(let i = 0; i < txt.length; i++) {
		currChar = txt.charAt(i);
		nextChar = txt.charAt(i + 1);
		if(alfabetoChars.has(currChar) && alfabetoChars.has(nextChar) ||	// aa
			currChar === '+' && alfabetoChars.has(nextChar) ||				// +a
			currChar === '*' && alfabetoChars.has(nextChar) ||				// *a
			alfabetoChars.has(currChar) && nextChar === '(' ||				// a(
			currChar === ')' && nextChar === '(' 			||				// )(
			currChar === ')' && alfabetoChars.has(nextChar)) {				// )a							
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

M1("hscripts&+~");