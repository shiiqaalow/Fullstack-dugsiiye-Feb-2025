use AND to select students who are gmail users with ID > 2

-- result

select * FROM  university.newStudents where email like 'gmail.com%' and id > 2

2 use AND to select students named hasan or husein

-- result

select * from university.newStudents where name = 'hasan' and name = 'husein'

3 use paranthese to tnis query:

select * from university.newStudents where ( name = 'hasan' or name = 'husein') and id < 2

-- result

select * from university.newStudents where name = 'hasan' or (name = 'husein' and id < 2)

4 write  your own query combining LIKE,AND,and OR

-- result

select * from university.newStudents where ( email like 'h%' or name = 'h' ) and id < 4

5 use SELECT, then turn it into a safe UPDATE or DELETE

-- result

delete from university.newStudents where ( email like 'h%' or name = 'h' ) and id < 4

update  university.newStudents SET name = 'fatimah' where name like 'f%'

select * from university.newStudents
