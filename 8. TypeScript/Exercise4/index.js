"use strict";
const login = (user) => {
    console.log(user);
};
console.log('Signing in...');
login({
    username: 'shiiqaalow',
    password: 12345,
});
console.log("");
console.log("");
// with Email
console.log('Signing in with Email...');
login({
    username: 'shiiqaalow',
    password: 12345,
    email: 'shiiqaalow@gmail.com'
});
console.log("");
console.log("");
// without Email
console.log('Signing in without Email...');
login({
    username: 'shiiqaalow',
    password: 12345,
});
console.log("");
console.log("");
// with fixed ID
console.log('Signing in with ID readonly...');
const newUser = {
    id: 111,
    username: 'shiiqaalow',
    password: 12345,
    email: 'shiiqaalow@gmail.com'
};
login(newUser);
newUser.id = 53;
