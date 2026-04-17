1. Use `$unwind` to flatten the `courses` array

    db.students.aggregate([
        {$unwind: '$courses' }
    ])

2. Use `$match` to **filter only scores above 85**

    db.students.aggregate([
        {$match: {score:{$gt:85}} }
    ])

3. Use `$group` to count how many top performers per course

    db.students.aggregate([
        {$unwind:'$courses'},
        {$group: {_id:'$courses',total: {$sum:1} } }
    ])

4. Use `$project` to rename `_id` to `course`, and show `total`

    db.students.aggregate([
        {$unwind:'$courses'},
        {$group: {_id:'$courses',total: {$sum:1} } },
        {$project: {_id:0, course:'$_id', total:1} }
    ])

5. Use `$sort` to order by most high scorers

    db.students.aggregate([
        {$unwind:'$courses'},
        {$group: {_id:'$courses',total: {$sum:1} } },
        {$project: {_id:0, course:'$_id', total:1} },
        {$sort: {total:-1} }
    ])