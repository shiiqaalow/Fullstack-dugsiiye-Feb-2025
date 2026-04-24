

console.log("combination of for of & for in loop");

const players = [
   { name: "shiiqaalow", age: 23, team: "Chelsea"},
   { name: "qanjey",  age: 22, team: "liverpool"},
   { name: "jilba-dheere", age: 21, team: "Arsenal"}
];

for (let player of players) {
    for (let key in player) {
        console.log(key + ":",  player[key]);
    }
    console.log("---------------");
}