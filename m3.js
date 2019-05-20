  'use strict'

  //input
  let alfabeto = '$;a;b;c;';
  let estadoInicial = 0;
  let estadosFinales = '6;';
  let matrizT = [ [ '/', '1', '/', '/' ],
  [ '2', '/', '/', '/' ],
  [ '/', '/', '3', '/' ],
  [ '4', '/', '3', '/' ],
  [ '5', '/', '/', '/' ],
  [ '/', '/', '/', '6' ],
  [ '/', '/', '/', '/' ]  ];

  
    let al =[];
    let estadoInicialAFN = estadoInicial;
    let estadoFinalAFN = [];
    let matrizAFN = [];

  al= definirAlfabeto(alfabeto);
  definirEstadoFinal();
  crearMatrizAFN();

let eCerradura = [matrizT.length];
for(let i=0; i<matrizT.length; i++){
    eCerradura[i]=[];
    eCerradura[i] = epsilonCerradura(i,eCerradura[i]); //sacar epsilon cerraduras
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

print();
  
/*************************
 ****** FUNCIONES ********
**************************/
function definirAlfabeto(alfabeto){
    let al = '';
    for(let i=0; i<alfabeto.length; i++){
        if(alfabeto[i] != ';' && alfabeto[i] != '$'){
            al += alfabeto[i];
        }
    }
    return al;
}

function definirEstadoFinal(){
    let ef = '';
    for(let i=0; i<estadosFinales.length; i++){
        if(estadosFinales[i] != ';'){
            ef += estadosFinales[i];
        }
        else{
            estadoFinalAFN.push(Number(ef));
            ef = '';
        }
    }
}
function crearMatrizAFN(){
    for(let i=0; i< matrizT.length; i++){
        matrizAFN[i] = [al.length];
        for(let k=0; k<al.length; k++){ 
            matrizAFN[i][k]='/'; //inicializar con vacio
        }
    }
}

function epsilonCerradura(estadoActual, ec){
    let toPush ='';
    let flag = false;
    let nS;
    if(!ec.includes(estadoActual))
        ec.push(estadoActual); //siempre puedes acceder a ti mismo con epsilon
    if(matrizT[estadoActual][0] != '/'){
        flag = true;
        if(matrizT[estadoActual][0].length >1){
            for(let a=0; a<matrizT[estadoActual][0].length; a++){
                if(matrizT[estadoActual][0][a] != ','){
                   toPush+= matrizT[estadoActual][0][a];
                }else{
                    ec.push(Number(toPush));
                    nS = Number(toPush);
                    ec = epsilonCerradura(nS,ec);
                    toPush = '';
                }
                if(a+1 == matrizT[estadoActual][0].length){
                    ec.push(Number(toPush));
                    nS = Number(toPush);
                    ec = epsilonCerradura(nS,ec);
                }
            }
        }
        else{
            ec.push(Number(matrizT[estadoActual][0]));
            nS = Number(matrizT[estadoActual][0]);
            ec = epsilonCerradura(nS,ec);
        }
    }
    
return ec;
}

function print(){
    console.log('Alfabeto: ', al);
    console.log('Estado Inicial: ',estadoInicialAFN);
    let eF ='';
    for(let i =0; i<estadoFinalAFN.length; i++){
        eF += estadoFinalAFN[i];
    }
    console.log('Estados Finales: ',estadoFinalAFN);
    console.log('Matriz', matrizAFN);
}