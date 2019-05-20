'use strict'
//input
    let postfija = 'ab+.c.';
/*
DEFINICIONES:
Epsilon = $
Vacio = /
/n = ~
OR = ,
Concatenacion = .
Cerradura estrella = *
Cerradura positiva = +
*/
//vars
    let initialState = 0;
    let actualState = 0;
    let finalState = '';
    let alphabet = '$';
    let matrizT = [];
    let epsilon =alphabet.indexOf('$');;
    let pos;
    let contOR=0;
    let auxState =0;
    let orFinalState =0;
    let checkOrFirst = postfija.substring(0,5);
    let i=0;
    let flag = false;

    //define el alfabeto de la expresion postfija recibida
    alphabet= defineAlphabet(postfija,alphabet);

    //si hay un OR al principio, se procesa primero
        if(checkOrFirst.includes(',') ){
            i= checkOrFirst.indexOf(',')+1;
            let subs = checkOrFirst.substring(0,i);
            if(!subs.includes('.')){ 
                actualState = or(actualState,i-1);
                if(!flag)
                i+=1;
                else
                i+=2;
            }
            else{ i=0;}
           
        }
    //recorremos la expresión y vamos procesando
        for(i; i< postfija.length; i++){  
            console.log(i, postfija[i], actualState);
            if(postfija[i] == ','){ //Si es un OR
                actualState = or(actualState,i);
                if(i + 1 == postfija.length){
                    continue;
                }
            }
            else if(postfija[i] == '.' ){  //Si es una concatenacion
            if((postfija[i+2] == ',' || postfija[i+3] == ',' || postfija[i-1] == ',')){ //Si está antes de un OR, se salta y se procesa hasta el OR
            }
            else if(postfija[i-1] == '*' || postfija[i-1] == '+'){ //Si está después de un * o + se salta y se procesa en * o +
                if(i + 1 == postfija.length){
                    finalState += actualState;
                    break;
                }
               console.log('entro');
            }else{
                actualState =concat(actualState, i); //Se procesa la concatenación
            }
            }
            else if(postfija[i] == '*'){ //Si es cerradura estrella
                if((postfija[i+1] == ',' ||postfija[i+2] == ',' || postfija[i+3] == ',' || postfija[i-1] == ',')){ //Si está antes de un OR, se salta y se procesa hasta el OR
                oneTransition(epsilon,actualState,actualState+1);
                actualState+=1;
                }
                else{
                    actualState = star(actualState,actualState+1, i);
                }
            }
            else if(postfija[i] == '+'){ //Si es cerradura positiva
                actualState = positive(actualState,actualState+1, i);
            }
            else  if(postfija[i+1] != '*' && postfija[i+1] != '+' && postfija[i+1] != '.'
            && postfija[i+1] != ','&& postfija[i+2] != ',' && postfija[i+3] != ',' && i+1 != postfija.length && postfija[i] != '.'){ //Si es una letra sin operador al principio
                actualState = oneLetter(actualState, actualState+1,i);
            }
        }
    
    print();

    /* *******************************************************************
    ***************************FUNCIONES**********************************
    **********************************************************************/
    function print(){ //Función que imprime
        let al='';
        let fS='';
        for(let b = 0; b<alphabet.length; b++){
            al+= alphabet[b] + ';';
        }
        console.log('Expresión regular postfija: ', postfija);
        console.log('Alfabeto: ', al);

        if(matrizT.length >=10 && finalState.length >1){
            for(let o=1; o<finalState.length; o++){
                fS += finalState[o-1] + finalState[o]+';';
            }
        }else{
        for(let o=0; o<finalState.length; o++){
            fS += finalState[o] +';';
        }}
        console.log('Estado Inicial: ',initialState);
        console.log('Estados Finales: ',fS);
        extendMatrix(Number(finalState));
        matrizT[Number(finalState)][0]='/';
        for(let a = 0; a<matrizT.length; a++ ){
            for(let i=0; i<alphabet.length; i++){
                if(matrizT[a][i] == null){
                    matrizT[a][i] = '/';
                }}}        
            
        console.log('Matriz', matrizT);
    }

    function oneTransition(pos, actualState, nextState){   //TRANSICION ESTANDAR
        extendMatrix(actualState);
        matrizT[actualState][pos]= nextState.toString();
    }

    function extendMatrix(actualState){  //CREAR ARRAY PARA EL ESTADO INDICADO EN LA MATRIZ
        if(matrizT[actualState] == undefined)
        matrizT[actualState] = [alphabet.length];
    }

   function defineAlphabet(postfija, alphabet){    //DEFINE EL ALFABETO
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

    function oneLetter(actualState,nextState,i){     //PROCESA UNA LETRA SIN OPERADOR
        extendMatrix(actualState);
        if(alphabet.includes(postfija[i])){
            matrizT[actualState][0]='/';
        }
            let pos = alphabet.indexOf(postfija[i]);
            oneTransition(pos,actualState, nextState);
            actualState+=1;
            extendMatrix(actualState);
            oneTransition(epsilon,actualState, actualState+1);
            actualState+=1;
            extendMatrix(actualState);

            return actualState;
    }

    function star(actualState,nextState, i){     //CERRADURA ESTRELLA
        console.log('star', actualState);
        extendMatrix(actualState);
        oneTransition(epsilon,actualState, nextState);
        actualState = nextState;
        extendMatrix(actualState);

        pos = alphabet.indexOf(postfija[i-1]);
        matrizT[actualState][pos] = actualState.toString();

        oneTransition(epsilon,actualState, actualState+1);
        actualState+=1;        
    
        if(i + 1 == postfija.length){
            finalState += actualState;
        }
        return actualState;
    }

    function concat(actualState, i){     //CONCATENACION
            if((postfija[i-2] == '*'|| postfija[i-2] == '+' || postfija[i-2] == '.') && postfija[i-3] != ','){
                
                extendMatrix(actualState);
                oneTransition(epsilon,actualState, actualState+1);
                actualState +=  1;
            }
          
            extendMatrix(actualState);
            // posicion en el alfabeto del simbolo anterior, el concatenado
            pos = alphabet.indexOf(postfija[i-1]);          
            matrizT[actualState][0]='/';
            oneTransition(pos,actualState, actualState+1);
            
            actualState +=  1;
             //si es el ultimo simbolo, definir el estado final
             if(i + 1 == postfija.length){
                finalState += actualState;
            }
            return actualState;
            }

    function positive(actualState, nextState, i){     //CERRADURA POSITIVA
        extendMatrix(actualState);

        if(alphabet.includes(postfija[i-1])){
            matrizT[actualState][0]='/';
        }
        pos = alphabet.indexOf(postfija[i-1]);

        oneTransition(pos,actualState, nextState);
        actualState = nextState;
        extendMatrix(actualState);
        oneTransition(pos,actualState, actualState);
        oneTransition(epsilon,actualState, actualState+1);
        actualState +=  1;
        if(i + 1 == postfija.length){
            finalState += actualState;
        }
        return actualState;
    }

    function or(actualState,i){     //OR
        let initStateOR = actualState;
        extendMatrix(initStateOR);
         //si es el primer OR
            contOR +=1;
            let indexSecondOr = i-2;
            extendMatrix(actualState);
            oneTransition(epsilon,actualState, actualState+1);
            actualState+=1;
            auxState = actualState;
            actualState+=1;
            matrizT[initStateOR][epsilon]+= ','+ actualState.toString();

            if(postfija[i-1]=='*' || postfija[i-1]=='+'){
                if(postfija[i-1]=='*'){
                    actualState = star(actualState, actualState+1,i-1);
                    extendMatrix(actualState);
                    oneTransition(epsilon,actualState,actualState+1);
                    actualState+=1;
                }else if(postfija[i-1]== '+'){
                    actualState=positive(actualState, actualState+1,i-1);
                    extendMatrix(actualState);
                    oneTransition(epsilon,actualState,actualState+1);
                    actualState+=1;
                }
                if(postfija[i-3] == '*'){
                    auxState = star(auxState,actualState+1,i-3);
                    extendMatrix(auxState);
                    oneTransition(epsilon,auxState,actualState);
                }else if(postfija[i-3]== '+'){
                    auxState=positive(auxState,actualState+1,i-3);
                    extendMatrix(auxState);
                    oneTransition(epsilon,auxState,actualState);
                }
                else{
                    extendMatrix(auxState);
                    indexSecondOr=i-3;
                    if(postfija[i-3]== '.'){
                        indexSecondOr = i-4;
                        }
                     if(alphabet.includes(postfija[indexSecondOr])){
                         matrizT[auxState][0]='/';
                     }
                    oneTransition(alphabet.indexOf(postfija[indexSecondOr]),auxState,actualState+1);
                    auxState = actualState+1;
                    extendMatrix(auxState);
                    oneTransition(epsilon,auxState,actualState);
                    //define el estado final del or  
                    extendMatrix(actualState); 
                    orFinalState = actualState;
                    matrizT[actualState][0]='/';                  
                }}
            else{
                extendMatrix(actualState);
                actualState =oneLetter(actualState,actualState+1,i-1);     
                orFinalState = actualState;
                matrizT[actualState][0]='/';
                  
                if(postfija[i-2] == '*'){
                    auxState = star(auxState, actualState+1,i-2);
                    extendMatrix(auxState);
                    oneTransition(epsilon,auxState,actualState);

                }else if(postfija[i-2]== '+'){
                    auxState = positive(auxState, actualState+1,i-2);
                    extendMatrix(auxState);
                    oneTransition(epsilon,auxState,actualState);
                }
                else{
                    if(postfija[i-2]== '.'){
                    indexSecondOr = i-3;
                    }
                    extendMatrix(auxState);
                    if(alphabet.includes(postfija[indexSecondOr])){
                        matrizT[auxState][0]='/';
                    }
                    oneTransition(alphabet.indexOf(postfija[indexSecondOr]),auxState,actualState+1);
                    auxState = actualState+1;
                    extendMatrix(auxState);
                    oneTransition(epsilon,auxState,actualState);  } 
                  }
                    //si el final del or es el final de la cadena, lo define como estado final, sino hace una e-transicion
                    if(postfija[i+2]== ',' && postfija[i+4]!='.'){
                        console.log('more');
                        //Si no es el primer OR concatenado que encuentra
                        i = i+2;
                        flag=true;
                        auxState += 1;
                        matrizT[initStateOR][epsilon]+= ','+ auxState.toString();
                        if(postfija[i-1] == '*'){
                            auxState = star(auxState, auxState+1,i-1);
                            extendMatrix(auxState);
                            oneTransition(epsilon,auxState,actualState);

                        }else if(postfija[i-1]== '+'){
                            auxState = positive(auxState, auxState+1,i-1);
                            extendMatrix(auxState);
                            oneTransition(epsilon,auxState,actualState);
                        }
                        else{
                            extendMatrix(auxState);
                            if(alphabet.includes(postfija[i-1])){
                                matrizT[auxState][0]='/';
                            }
                            oneTransition(alphabet.indexOf(postfija[i-1]),auxState,auxState+1);
                            auxState +=1;
                            extendMatrix(auxState);
                            matrizT[auxState][epsilon]= (actualState).toString();
                        } 
                    }
                    if(i + 1 == postfija.length && finalState == ''){
                        finalState += actualState;
                    }
                    else if(postfija[i+1] == '.' && i+2 ==postfija.length && finalState == ''){
                        finalState += actualState;
                    }
                    else{
                        oneTransition(epsilon, actualState, auxState+1);
                        i= i+1;
                    }
         return auxState+1;}