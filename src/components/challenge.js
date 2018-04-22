const { performance } = require('perf_hooks');

var arr = [1,3,6,7,9,4,3,2,43]
var arr1 = [-1,-3,4,6,-19,3,5,7,10000000, -13213213123213, 1];
var arr2 = [1,2,3];
var arr3 = [99];


function solution1(A){
    var min = 1;
    var auxe = A.filter((el) => (Math.sign(el) === 1)).sort((a, b) => (a - b));
    for (var i of auxe) {
        if (i > 0 && i == min) {
            min++;
        }else if(i>0){
            return min;
        }
    }
    return min
}

function solution2(A){
    var min = 1;
    var auxe = new Set(A.sort(function(a,b){
       return a - b; 
    }));
    for (var i of auxe) {
        if (i > 0 && i == min) {
            min++;
        }else if(i>0){
            return min;
        }
    }
    return min
}

var t0 = performance.now();
console.log(solution1(arr));
var t1 = performance.now();
console.log("Call to solution1 took " + (t1 - t0) + " milliseconds.");

t0 = performance.now();
console.log(solution2(arr));
t1 = performance.now();
console.log("Call to solution2 took " + (t1 - t0) + " milliseconds.");