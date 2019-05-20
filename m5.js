//M5. (20 puntos) Entrada: AFD Salida: AFD minimizado

const M5 = (alfabeto, edoInicial, edosFinales, transiciones) => {
	let edosEquivalentes = [];
	alfabeto = alfabeto.split("");
	edosFinales = edosFinales.split(',').map(function(value){
		return parseInt(value, 10);
	});
	tablaPares = [];

	//Paso 1: Creamos una tabla con todos los pares de edos y la llenamos con valores default, indicando que no están marcados (false)
	for (let i = 0; i < transiciones.length; i++) {
		tablaPares[i] = [];
		for (let j = 0; j < transiciones.length; j++) {
			tablaPares[i][j] = false;
		}
	}

	//Paso 2: Marcamos las casillas donde un estado es final y el otro no
	for (let i = 0; i < transiciones.length; i++) {
		for (let j = i + 1; j < transiciones.length; j++) {
			if(!edosFinales.includes(i) && edosFinales.includes(j) || edosFinales.includes(i) && !edosFinales.includes(j)){
				marcarCasilla(tablaPares, i,j);
			}else{
				edosEquivalentes.push([i,j]);
			}
		}
	}

	//Paso 3: Repetir lo siguiente hasta que no haya cambios:
	//Si esxiste un par no-marcado {p,q} talque {d{p,a}, d{q,a}} está marcado para cada caracter en el alfabeto, entonces marcamos {p,q} 
	let cambio = true;
	let p, q;

	while(cambio){
		cambio = false;
		for (let i = 0; i < transiciones.length; i++) {
			for (let j = i + 1; j < transiciones.length; j++) {
				if(!tablaPares[i][j]){		//Sino está marcado entonces checaremos {d{p,a}, d{q,a}} por cada caracter "a" en el alfabeto
					for(let k = 0; k < alfabeto.length; k++){
						p = transiciones[i][k];
						q = transiciones[j][k];
						if(tablaPares[p][q]){
							 removePar(edosEquivalentes, i, j);
							 marcarCasilla(tablaPares, i, j);
							 cambio = true;
						}
					}
				}
			}
		}
	}

	//Agregamos dos Sets donde mantendremos un control de los estados que se eliminan y los que se quedan
	let edosEliminados = new Set([]);
	let edosRemain = new Set([]);

	edosEquivalentes.forEach((par) => {
		edosRemain.add(par[0])
		edosEliminados.add(par[1]);
	});
	
	//Mapa que tiene la función de retornar el estado al que apuntan ahora los nuevos estados
	//Ejemplo si se colapsan un edo 0 y 1 ahora decimos que el edo 1 se eliminará y 0 quedará
	//así que en el mapa como llave será el estado anterior y de valor el nuevo nombre del estado que equivale a la equivalencia de los dos estados
	// 0 => 0
	// 1 => 0
	let edosMap = {};
	let cont = 0;

	//Se itera cada estado y si no es uno que se eliminará, entonces lo agregamos a edosMap
	//para de esa forma declarar su nuevo nombre de estado
	for (let i = 0; i < transiciones.length; i++) {
		if(!edosEliminados.has(i)){
			if(edosRemain.has(i)){
				edosEquivalentes.forEach((par) => {
					if(par[0] === i){
						edosMap[par[1]] = cont;
					}
				});
				edosMap[i] = cont++;
			}else{
				edosMap[i] = cont++;			
			}
		}
	}

	//Se crea un nuevo arreglo de transiciones que contiene todas las transiciones después de la minimización
	let lenNvasTrans = 0;
	let nuevasTransiciones = [];
	for (let i = 0; i < transiciones.length; i++) {
		if(!edosEliminados.has(i)){
			nuevasTransiciones[lenNvasTrans] = [];
			for (let j = 0; j < alfabeto.length; j++) {
				nuevasTransiciones[lenNvasTrans][j] = edosMap[transiciones[i][j]];
			}	
			lenNvasTrans++;
		}
	}

	//Para finalizar borramos de los estados finales los estados que se eliminaron por la minimización
	edosFinales = edosFinales.filter(edo => !edosEliminados.has(edo)).join();

	return{
		alfabeto, 
		edoInicial,
		edosFinales,
		transiciones: nuevasTransiciones
	}
}

const marcarCasilla = (tablaPares, i, j) => {
	tablaPares[i][j] = true;
	tablaPares[j][i] = true;
}

const removePar = (edosEquivalentes, i, j) => {
	for (let k = edosEquivalentes.length - 1; k >= 0; k--) {
		if(edosEquivalentes[k][0] === i && edosEquivalentes[k][1] === j){
			edosEquivalentes.splice(k, 1);
			break;
		}
	}
}

// M5("ab", 0, "2", [[1,2], [1,2], [3,3], [3,3]]);
// M5("ab", 0, "1,2,5", [[1,2], [3,4], [4,3], [5,5], [5,5], [5,5]]);
// M5("ab", 0, "2", [[1,5], [6,2], [0,2], [2,6], [7,5], [2,6], [6,4], [6,2]]);
console.log(M5("ab", 0, "1,2,5", [[1,2], [3,4], [4,3], [5,5], [5,5], [5,5]]));