"use strict";
// conver this to typeScript
// function fullName (first,last) {
//     return first + "" + last
// }
const fullName2 = (first, last) => {
    return first + " " + last;
};
fullName2('ali', 'xusein');
// optional and default parameters
const registerUser = (username, isAdmin, language = 'eng') => {
    return `username: ${username} ${" "} isAdmin: ${isAdmin} ${" "} language: ${language}`;
};
console.log(registerUser('shiiqaalow', true));
// safe rest function
const average = (...scores) => {
    return scores.reduce((sum, score) => sum + score, 0);
};
console.log('AverageSum:>', average(12, 12, 6, 50, 20));
