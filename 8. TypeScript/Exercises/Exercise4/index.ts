// 1 create interface User with username and password
// then write a function login and call it with void obj
interface User {
    username: string,
    password: number
}

const login = (user:User): void => {
    console.log(user)
}
console.log('Signing in...')
login({
    username:'shiiqaalow',
    password: 12345,
})

// 2 use optional operator and extend User with email

interface User {
    username: string,
    password: number,
    email?: string
}

console.log("")
console.log("")

// with Email
console.log('Signing in with Email...')
login({ 
    username:'shiiqaalow',
    password: 12345,
    email: 'shiiqaalow@gmail.com'
})

console.log("")
console.log("")

// without Email
console.log('Signing in without Email...')

login({
    username:'shiiqaalow',
    password: 12345,
})



// 3 add readonly id to User

interface UserWithId {
    readonly id: number,
    username: string,
    password: number,
    email?: string
}


console.log("")
console.log("")

// with fixed ID
console.log('Signing in with ID readonly...')



const newUser:UserWithId ={
    id: 111,
    username:'shiiqaalow',
    password: 12345,
    email: 'shiiqaalow@gmail.com'
}

login(newUser)

newUser.id = 53
