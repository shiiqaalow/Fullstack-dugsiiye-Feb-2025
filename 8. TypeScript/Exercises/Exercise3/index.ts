// conver this to typeScript

function fullName (first,last) {
    return first + "" + last
}

const fullName2 = (first:string,last:string): string => {
    return first + " " + last
}

fullName2('ali','xusein')


// optional and default parameters

const registerUser = (username: string, isAdmin: boolean, language: string = 'eng') => {
    return `username: ${username} ${" "} isAdmin: ${isAdmin} ${" "} language: ${language}`
}

console.log(registerUser('shiiqaalow',true))


// safe rest function

const average = (...scores:number[]): number => {
    return scores.reduce((sum,score)=> sum + score ,0)
}

console.log('AverageSum:>',average(12,12,6,50,20))

// outPut AverageSum: 100 