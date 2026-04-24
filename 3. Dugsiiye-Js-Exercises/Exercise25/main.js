console.log(`===spread operator====`);

const newNumbers = [1,2,3];

const oldNumbers = [...newNumbers,4,5,6];

console.log(oldNumbers);

        console.log(`===rest operator===`);

function multiply (...numbers){
    return numbers.reduce((total,numbers) => total * numbers, 1);
}

console.log(multiply(4,2,3,6));
