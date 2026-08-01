"use strict";
// 1 Echo function with Generics
// _______________________________________________________________________________________
const echo = (input) => {
    return input;
};
// with string
const nickName = echo('Shiiqaalow');
console.log('nickName:', nickName);
// with number
const myAge = echo(24);
console.log('myAge:', myAge);
// with object
const myData = {} = echo({
    name: 'Shiiqaalow',
    age: 24,
    isMarried: false
});
console.log('myData > Name:', myData.name);
console.log('myData > Age:', myData.age);
console.log('myData > isMarried:', myData.isMarried);
// with array
const contacts = [] = echo([
    '276 789 200 87',
    '276 859 360 12',
    '276 612 903 75',
]);
console.log('contacts:', contacts[0]);
console.log('contacts:', contacts[1]);
console.log('contacts:', contacts[2]);
// with string
const response = {
    status: 'success',
    data: 'new course'
};
console.log('response > status: ', response.status);
console.log('response > data: ', response.data);
const userResponse = {
    status: 'success',
    data: {
        user: {
            id: 12345,
            name: 'shiiqaalow',
            age: 24,
            isOnline: true,
        }
    }
};
console.log('userResponse > data: ', userResponse.data);
console.log('userResponse > data > user > id : ', userResponse.data.user.id);
console.log('userResponse > data > user > name: ', userResponse.data.user.name);
console.log('userResponse > data > user > age: ', userResponse.data.user.age);
console.log('userResponse > data > user > isOnline: ', userResponse.data.user.isOnline);
// 3 first Element function
const first = (items) => {
    return items;
};
// with array of numbers
const phones = first([111, 222, 333, 444]);
console.log('phones', phones[0]);
// with array of strings
const emails = first(['shiiqaalow111', 'shiiqaalow222', 'shiiqaalow333', 'shiiqaalow444']);
console.log('emails', emails[0]);
// with array of objects
const addresses = first([{ country: 'south-africa' }, { city: 'capetown' }]);
console.log('addresses', addresses[0]);
