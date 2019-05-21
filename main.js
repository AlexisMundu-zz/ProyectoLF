const M1 = require('./m1');
const M2 = require('./m2');

let regExpr = "a,bc";
let o_M1 = M1(regExpr);
let o_M2 = M2(o_M1);
console.log(o_M1);
console.log(o_M2.matrizT);