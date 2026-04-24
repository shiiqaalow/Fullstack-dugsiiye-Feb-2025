1. Insert 3 students with fields:
    - `name`, `email`, `points`, `courses` (array)

    db.students.insertMany([
        {
            name: 'farhia',
            email: 'farhia19@gmail.com',
            points: 88,
            courses: ['React','javaScript','TailwindCss']
        },
        {
            name: 'abdiwali',
            email: 'abdiwali54@gmail.com',
            points: 95,
            courses: ['React.js','Node.js','SQL']
        },
        {
            name: 'mahad',
            email: 'mahad59@gmail.com',
            points: 78,
            courses: ['HTML','MangoDB','SQL']
        },
    ])
    
2. Use `$set` to update one email

    db.students.updateOne({
            name: 'mahad'},
            {$set:{email:'mahad11'}
        })

    -- result 
    
    {
        name: 'mahad',
        email: 'mahad11@gmail.com',
        points: 78,
        courses: ['HTML','MangoDB','SQL']
    },


3. Use `$inc` to increase points

    db.students.updateOne(
        {name: 'mahad'},
        {$inc: {points:12} }
    )

    -- result

    {
        name: 'mahad',
        email: 'mahad11@gmail.com',
        points: 90,
        courses: ['HTML','MangoDB','SQL']
    }


4. Use `$push` to add a new course

    db.students.updateOne(
        {name: 'mahad'},
        {$push:{courses:'python'}}
    )

    -- result

    {
        name: 'mahad',
        email: 'mahad11@gmail.com',
        points: 90,
        courses: ['HTML','MangoDB','SQL', 'python']
    }

5. Use `$pull` to remove a course

     db.students.updateOne(
        {name: 'mahad'},
        {$pull:{courses:'python'}}
    )

    -- result

    {
        name: 'mahad',
        email: 'mahad11@gmail.com',
        points: 90,
        courses: ['HTML','MangoDB','SQL']
    }


6. BONUS: Update one student with `$set`, `$inc`, and `$push` together

   db.students.updateOne(
    {name:'mahad'},
    {
        $set: {email:'mahadUpdated@dugsiiye.com'} ,
        $inc: {points: 5} ,
        $push: {courses: 'python'} 
    }
    )

    -- result


    {
        name: 'mahad',
        email: 'mahadUpdated@dugsiiye.com',
        points: 95,
        courses: ['HTML','MangoDB','SQL', 'python']
    }
