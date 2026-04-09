1. Find students older than 22

    -- first add 10+ students

    db.students.insertMany([
        {
        name: "sacdia",
        email: "sacdia143@hotmail.com",
        age: 24,
        courses: ["TailwindCSS","Framer Motion","Python"]
        },
        {
        name: "Ahmed",
        email: "ahmed22@gmail.com",
        age: 22,
        courses: ["React","NodeJS","MongoDB"]
        },
        {
        name: "Layla",
        email: "layla88@hotmail.com",
        age: 25,
        courses: ["Python","Django","SQL"]
        },
        {
        name: "Hassan",
        email: "hassan77@gmail.com",
        age: 23,
        courses: ["React","TailwindCSS","JavaScript"]
        },
        {
        name: "Zainab",
        email: "zainab11@yahoo.com",
        age: 21,
        courses: ["HTML","CSS","JavaScript"]
        },
        {
        name: "Yusuf",
        email: "yusuf44@gmail.com",
        age: 26,
        courses: ["NodeJS","MongoDB","Express"]
        },
        {
        name: "Maryam",
        email: "maryam55@hotmail.com",
        age: 24,
        courses: ["Framer Motion","React","TailwindCSS"]
        },
        {
        name: "Omar",
        email: "omar33@yahoo.com",
        age: 27,
        courses: ["Python","Flask","SQL"]
        },
        {
        name: "Aisha",
        email: "aisha90@gmail.com",
        age: 22,
        courses: ["React","JavaScript","TailwindCSS"]
        },
        {
        name: "Bilal",
        email: "bilal101@hotmail.com",
        age: 28,
        courses: ["MongoDB","NodeJS","Express"]
        }
    ])

    -- now search for students older than 22

    db.students.find({ age: {$gt:22} })

    result:

    { _id: ObjectId('69d79bd9e52123743f3dd150'), name: 'shiiqaalow', email: 'shiiqaalka77@gmail.com', age: 23, courses: [ 'javaScript', 'react.js', 'sql', 'node.js' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd152'), name: 'fatima', email: 'fatima139@hotmail.com', age: 24, courses: [ 'TailwindCss', 'Framer-Motion', 'python' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd153'), name: 'sacdia', email: 'sacdia143@hotmail.com', age: 24, courses: [ 'TailwindCSS', 'Framer Motion', 'Python' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd155'), name: 'Layla', email: 'leyla88@hotmail.com', age: 25, courses: [ 'Python', 'Django', 'SQL' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd156'), name: 'Hassan', email: 'hassan77@gmail.com', age: 23, courses: [ 'React', 'TailwindCSS', 'JavaScript' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd158'), name: 'Yusuf', email: 'yusuf44@gmail.com', age: 26, courses: [ 'NodeJS', 'MongoDB', 'Express' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd159'), name: 'Maryam', email: 'maryam55@hotmail.com', age: 24, courses: [ 'Framer Motion', 'React', 'TailwindCSS' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd160'), name: 'Omar', email: 'omar33@yahoo.com', age: 27, courses: [ 'Python', 'Flask', 'SQL' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd161'), name: 'Bilal', email: 'bilal101@hotmail.com', age: 28, courses: [ 'MongoDB', 'NodeJS', 'Express' ] }


2. Find students enrolled in React

    db.students.find({courses:{$regex:'React'}})

    -- result

    {
        _id: ObjectId('69d7cbf9e52123743f3dd154'),
        name: 'Ahmed',
        email: 'ahmed22@gmail.com',
        age: 22,
        courses: [
            'React',
            'NodeJS',
            'MongoDB'
        ]
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd156'),
        name: 'Hassan',
        email: 'hassan77@gmail.com',
        age: 23,
        courses: [
            'React',
            'TailwindCSS',
            'JavaScript'
        ]
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd159'),
        name: 'Maryam',
        email: 'maryam55@hotmail.com',
        age: 24,
        courses: [
            'Framer Motion',
            'React',
            'TailwindCSS'
        ]
    }
    {  
        _id: ObjectId('69d7cbf9e52123743f3dd161'), 
        name: 'Aisha', 
        email: 'aisja90@gmail.com', 
        age: 22, 
        courses: [ 'React', 'JavaScript', 'TailwindCSS' ] 
    }   

3. Find students whose name starts with 'S'

    db.students.find({name:{$regex:/^s/}})

    -- result
    
    { _id: ObjectId('69d79bd9e52123743f3dd150'), name: 'shiiqaalow', email: 'shiiqaalka77@gmail.com', age: 23, courses: [ 'javaScript', 'react.js', 'sql', 'node.js' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd153'), name: 'sacdia', email: 'sacdia143@hotmail.com', age: 24, courses: [ 'TailwindCSS', 'Framer Motion', 'Python' ] }

4. Find students whose age is either 18 or 21

    db.students.find({
        $or:[
            {age:18},
            {age:21}
        ]
    })

    -- result

        only Zainab is 21, no one is 18
    
    { _id: ObjectId('69d79bd9e52123743f3dd157'), name: 'Zainab', email: 'zainab11@yahoo.com', age: 21, courses: [ 'HTML', 'CSS', 'JavaScript' ] }


5. Find students who are NOT using Gmail

    db.students.find({email:{$not:/gmail/}})

    -- result

    { _id: ObjectId('69d79bd9e52123743f3dd152'), name: 'fatima', email: 'fatima139@hotmail.com', age: 24, courses: [ 'TailwindCss', 'Framer-Motion', 'python' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd153'), name: 'sacdia', email: 'sacdia143@hotmail.com', age: 24, courses: [ 'TailwindCSS', 'Framer Motion', 'Python' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd155'), name: 'Layla', email: 'layla88@hotmail.com', age: 25, courses: [ 'Python', 'Django', 'SQL' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd156'), name: 'Zainab', email: 'zainab11@yahoo.com', age: 23, courses: [ 'React', 'TailwindCSS', 'JavaScript' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd157'), name: 'Maryam', email: 'maryam55@hotmail.com', age: 24, courses: [ 'Framer Motion', 'React', 'TailwindCSS' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd158'), name: 'Omar', email: 'omar33@yahoo.com', age: 27, courses: [ 'Python', 'Flask', 'SQL' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd159'), name: 'Bilal', email: 'bilal101@hotmail.com', age: 28, courses: [ 'MongoDB', 'NodeJS', 'Express' ] }


6. Find students enrolled in React **and** older than 20

    db.students.find({
    $and:[
        {courses:'React'},
        {age:{$gt:20}}
    ]
    })

    -- result

    {
        _id: ObjectId('69d7cbf9e52123743f3dd154'),
        name: 'Ahmed',
        email: 'ahmed22@gmail.com',
        age: 22,
        courses: [
            'React',
            'NodeJS',
            'MongoDB'
        ]
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd156'),
        name: 'Hassan',
        email: 'hassan77@gmail.com',
        age: 23,
        courses: [
            'React',
            'TailwindCSS',
            'JavaScript'
        ]
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd159'),
        name: 'Maryam',
        email: 'maryam55@hotmail.com',
        age: 24,
        courses: [
            'Framer Motion',
            'React',
            'TailwindCSS'
        ]
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd15b'),
        name: 'Aisha',
        email: 'aisha90@gmail.com',
        age: 22,
        courses: [
            'React',
            'JavaScript',
            'TailwindCSS'
        ]
    }


7. Find students enrolled in React **or** Node.js

    db.students.find(
        {
            $or:[
                {courses:'React'},
                {courses:'Node.js'}
            ]
        }
    )    

    -- result
    
    {
        _id: ObjectId('69d7cbf9e52123743f3dd154'),
        name: 'Ahmed',
        email: 'ahmed22@gmail.com',
        age: 22,
        courses: ['React', 'NodeJS', 'MongoDB']
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd156'),
        name: 'Hassan',
        email: 'hassan77@gmail.com',
        age: 23,
        courses: ['React', 'TailwindCSS', 'JavaScript']
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd159'),
        name: 'Maryam',
        email: 'maryam55@hotmail.com',
        age: 24,
        courses: ['Framer Motion', 'React', 'TailwindCSS']
    }
    {
        _id: ObjectId('69d7cbf9e52123743f3dd15b'),
        name: 'Aisha',
        email: 'aisha90@gmail.com',
        age: 22,
        courses: ['React', 'JavaScript', 'TailwindCSS']
    }
    

8. BONUS: Use `$regex` to match names containing "x" or emails ending in `.edu`

    db.students.find({
        $or:[
            {name:{$regex:/x/}},
            {email:{$regex:/.edu$/}}
        ]
    })

    -- result

    no students have "x" in their name or email ending with .edu