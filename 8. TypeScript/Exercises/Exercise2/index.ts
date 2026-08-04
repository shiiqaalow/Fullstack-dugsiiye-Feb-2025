let names: string[] = [1,2,4]
let grades: number[] = [true,false]
let Status: boolean[] = ['ali','shiiqaalow']

console.log('names:',names, 'grades:',grades,'status:',Status)



// _______________the console error__________________________

// 1 let names: string[] = [1,2,4]
//                          ~

// index.ts:1:26 - error TS2322: Type 'number' is not assignable to type 'string'.


// 2 let grades: number[] = [true,false]
//                           ~~~~

// index.ts:2:30 - error TS2322: Type 'boolean' is not assignable to type 'number'.


// index.ts:3:26 - error TS2322: Type 'string' is not assignable to type 'boolean'.

// 3 let Status: boolean[] = ['ali','shiiqaalow']
//                            ~~~~~




// ________________________2_____________

// convert this javaScript

// let products = ['phone','laptop',90]vvv


let products: string[] = ['phone','laptop',90]

// _______-error______

// Type 'number' is not assignable to type 'string'.


// USE TUPLES FOR FIXED VALUES

let location: [string,number,number] = ['capetown', 7493,932]
// error
// Type 'number' is not assignable to type 'string'.

// console.log('location:>',location)

// ouPut: location: [ 'capetown', 7493, 932 ]