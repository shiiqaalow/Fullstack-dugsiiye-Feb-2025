// 1 Echo function with Generics
// _______________________________________________________________________________________

const echo = <T> (input:T):T => {
    return input
}

// with string
const nickName: string = echo('Shiiqaalow')
    console.log('nickName:',nickName)

// with number
const myAge: number = echo(24)
    console.log('myAge:',myAge)


// with object
const myData = {} = echo({
    name:'Shiiqaalow',
    age: 24,
    isMarried: false
})
    console.log('myData > Name:',myData.name)
    console.log('myData > Age:',myData.age)
    console.log('myData > isMarried:',myData.isMarried)


// with array
const contacts = [] =  echo([
    '276 789 200 87',
    '276 859 360 12',
    '276 612 903 75',
])
    console.log('contacts:',contacts[0])
    console.log('contacts:',contacts[1])
    console.log('contacts:',contacts[2])


    

// 2 Generic interface
// _______________________________________________________________________________________

interface ApiResult<T> {
    status: string,
    data: T
}

// with string
const response : ApiResult<string> = {
    status: 'success',
    data: 'new course'
}
    console.log('response > status: ',response.status)
    console.log('response > data: ',response.data)


// with object
interface UserData {
    id: number,
    name: string,
    age: number
    isOnline: boolean,
}

const userResponse: ApiResult<{user: UserData}> = {
    status: 'success',
    data: {
        user: {
            id: 12345,
            name: 'shiiqaalow',
            age: 24,
            isOnline: true,
        }
    }
}

    console.log('userResponse > data: ',userResponse.data)
    console.log('userResponse > data > user > id : ',userResponse.data.user.id)
    console.log('userResponse > data > user > name: ',userResponse.data.user.name)
    console.log('userResponse > data > user > age: ',userResponse.data.user.age)
    console.log('userResponse > data > user > isOnline: ',userResponse.data.user.isOnline)




// 3 first Element function
const first = <T>(items:T[]):T[] => {
    return items
}


// with array of numbers
const phones: Array<number> = first([111,222,333,444])
    console.log('phones',phones[0])


// with array of strings
const emails: Array<string> = first(['shiiqaalow111','shiiqaalow222','shiiqaalow333','shiiqaalow444'])
    console.log('emails',emails[0])


// with array of objects
const addresses: Array<{}> = first([{country:'south-africa'},{city:'capetown'}])
    console.log('addresses',addresses[0])