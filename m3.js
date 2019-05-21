  'use strict'

  const M3 = (alfabeto, estadoInicial, estadoFinal, matrizT)=>{
    let al =[];
    let estadoInicialAFN = estadoInicial;
    let estadoFinalAFN = [];
    let matrizAFN = [];
  
    al= definirAlfabeto(alfabeto);
    estadoFinalAFN[0]=estadoFinal;
    crearMatrizAFN(matrizT, matrizAFN,al);
  
    let eCerradura = [matrizT.length];
    for(let i=0; i<matrizT.length; i++){
        eCerradura[i]=[];
        eCerradura[i] = epsilonCerradura(matrizT,i,eCerradura[i]); //sacar epsilon cerraduras
    }
  
    for(let k=0; k<matrizT.length; k++){
        for(let j=0; j<al.length; j++){
            matrizAFN[k][j] = eCerradura[matrizT[k][j+1]];
            if(eCerradura[matrizT[k][j+1]] == undefined){
                matrizAFN[k][j] = ['/'];
            }else{
                for(let o=0; o<estadoFinalAFN.length; o++){
                    if(eCerradura[matrizT[k][j+1]].includes(estadoFinalAFN[o])){
                        estadoFinalAFN.push(k);
                    }
                }
            }
        }
    }

    //Convertir los estados finales a un String como el m4 los recibe
    let eF ='';
    for(let i =0; i<estadoFinalAFN.length; i++){
        eF += estadoFinalAFN[i] +';';
    }

    return{
        alphabet: al,
        initialS: estadoInicialAFN,
        finalS: eF,
        transitions: matrizAFN
    };
  }
  
/*************************
 ****** FUNCIONES ********
**************************/
const definirAlfabeto = (alfabeto)=>{
    let al = '';
    for(let i=0; i<alfabeto.length; i++){
        if(alfabeto[i] != ';' && alfabeto[i] != '$'){
            al += alfabeto[i];
        }
    }
    return al;
}

const crearMatrizAFN =(matrizT, matrizAFN, al) =>{
    for(let i=0; i< matrizT.length; i++){
        matrizAFN[i] = [al.length];
        for(let k=0; k<al.length; k++){ 
            matrizAFN[i][k]='/'; //inicializar con vacio
        }
    }
}

const epsilonCerradura =(matrizT,estadoActual, ec)=>{
    if(!ec.includes(estadoActual)) ec.push(estadoActual); //siempre puedes acceder a ti mismo con epsilon
    if(matrizT[estadoActual][0] != '/'){
        if(typeof matrizT[estadoActual][0] === 'number'){
            ec.push(matrizT[estadoActual][0]);
            ec = epsilonCerradura(matrizT,matrizT[estadoActual][0],ec);
        }
        else if(Array.isArray(matrizT[estadoActual][0])){
            for(let a =0; a<matrizT[estadoActual][0].length; a++){
                ec.push(matrizT[estadoActual][0][a]);
                ec = epsilonCerradura(matrizT,matrizT[estadoActual][0][a],ec);

            }
        }
    }
return ec;
}

console.log(M3('$;a;b;c;', 0,9,
[ [ [1,7], '/', '/', '/' ],
[ [2,4], '/', '/', '/' ],
[ '/', 3, '/', '/' ],
[ 6, '/', '/', '/' ],
[ '/', '/', 5, '/' ],
[ 6, '/', '/', '/' ],
[ 9, '/', '/', '/' ],
[ '/', '/', '/', 8 ],
[ 9, '/', '/', '/' ],
[ '/', '/', '/', '/' ]  ]));