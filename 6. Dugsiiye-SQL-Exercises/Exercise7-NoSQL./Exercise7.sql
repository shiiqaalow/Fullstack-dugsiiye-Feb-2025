1: create a students collection in dugsiiye DB

    use dugsiiye

    db.createCollection("students")

2: insert at least 3 students with fields:
    - name
    - email
    - age
    - courses (array)

    db.students.insertMany([
        {
            name: 'shiiqaalow',
            email: 'shiiqaalow99@gmail.com',
            age: 23,
            courses: ['javaScript','react.js','sql','node.js']
        },

        {
        name: 'madaxey',
        email: 'madaxey884@email.com',
        age: 22,
        courses: ['Html','css','git & github']
        },

        {
        name: 'fatima',
        email: 'fatima139@hotmail.com',
        age:24,
        courses: ['TailwindCss','Framer-Motion','python']
        }
    ])

    -- result:

    {
        acknowledged: true,
        insertedIds: {
            '0': ObjectId('69d79bd9e52123743f3dd150'),
            '1': ObjectId('69d79bd9e52123743f3dd151'),
            '2': ObjectId('69d79bd9e52123743f3dd152')
        }
    }

3: use find() to view the data

    db.students.find()

    -- result:

    { _id: ObjectId('69d79bd9e52123743f3dd150'), name: 'shiiqaalow', email: 'shiiqaalow99@gmail.com', age: 23, courses: [ 'javaScript', 'react.js', 'sql', 'node.js' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd151'), name: 'madaxey', email: 'madaxey884@'email.com, age: 22, courses: [ 'Html', 'css', 'git & github' ] }
    { _id: ObjectId('69d79bd9e52123743f3dd152'), name: 'fatima', email: 'fatima139@hotmail.com', age: 24, courses: [ 'TailwindCss', 'Framer-Motion', 'python' ] }

4: update a student's email
    
    db.students.updateOne(
        {name: 'shiiqaalow'},
        {$set :{email:'shiiqaalka77@gmail.com'}}
    )
    -- result:

    {
        acknowledged: true,
        insertedId: null,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0
    }

5: Delete one student

    db.students.deleteOne({name: 'madaxey'})

    -- result:
    
    {
        acknowledged: true,
        deletedCount: 1
    }

6: optional: insert a nested address object

    db.students.updateOne(

        {name: 'shiiqaalow'},

        { $set: { address: {
                city: 'Capetown',
                district: 'Western-cape',
                street: 'Belhar'  
            }}
        }
    )

    -- result:

    {
        acknowledged: true,
        insertedId: null,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0
    }