"use strict";
let productName = false;
let productPrice = 'balanket';
let discountAvailable = 350;
//____________________________________ the console________________________________________________
// console.log('product name =>',productName)
// console.log('product price =>',productPrice)
// console.log('discount availabe =>',discountAvailable)
//__________________________ this is console error i did copied ______________________________________________________
// ^[[Aindex.ts:1:7 - error TS2322: Type 'boolean' is not assignable to type 'string'.
// 1 let productName: string = false
//         ~~~~~~~~~~~
// index.ts:2:7 - error TS2322: Type 'string' is not assignable to type 'number'.
// 2 let productPrice: number = 'balanket'
//         ~~~~~~~~~~~~
// index.ts:3:7 - error TS2322: Type 'number' is not assignable to type 'boolean'.
// 3 let discountAvailable: boolean =  350
//         ~~~~~~~~~~~~~~~~~
// Found 3 errors in the same file, starting at: index.ts:1
// shiiqaalow@shiiqaalow-AceBook-1:~/Desktop/Fullstack/8. TypeScript/Exercise1$ tsc index.ts
//________________________________ now fixing the error and assigning the right values ___________________________
productName = 'balanket';
productPrice = 350;
discountAvailable = false;
console.log('product name =>', productName);
console.log('product price =>', productPrice);
console.log('discount availabe =>', discountAvailable);
// risky typescript function using (any)
function printLength(x) {
    console.log(x.length);
}
printLength('hello'); //r result (5)
// printLength(123) //r result (undefined)
// safer typescript function using (any)
function printSafeLength(x) {
    if (typeof x === 'string')
        console.log(x.length);
    if (typeof x === 'number')
        console.log(x.toFixed(2));
    if (typeof x === 'boolean')
        ;
}
printSafeLength('helloo'); //r result (6)
printSafeLength(123); // result (undefined)
