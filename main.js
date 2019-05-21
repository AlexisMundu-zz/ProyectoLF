const M1 = require('./m1');
const M2 = require('./m2');
const M3 = require('./m3');
const M4 = require('./m4');
const M5 = require('./m5');
const M6 = require('./m6');

let regExpr = "a,bc";
let o_M1 = M1(regExpr);
let o_M2 = M2(o_M1);
console.log(o_M1);
console.log(o_M2.matrizT);