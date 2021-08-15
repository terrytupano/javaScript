
/**
 * some function 
 * @param {*} num1 first number 
 * @param {*} num2  second number
 * @returns sum
 */
function sum(num1, num2) {
    return num1 + num2;
}

/**
 * some class 
 */
class Math {
    constructor() {
        console.log("Object created");
    }
}

/**
 * exportin public funcion and variables
 */
module.exports.sum = sum;
module.exports.Math = Math;