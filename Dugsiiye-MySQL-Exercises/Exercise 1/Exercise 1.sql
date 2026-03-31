-- Creating new table

create table university.newStudents(
    id int auto_increment primary key,
    name varchar(100),
    email varchar(100) ,
    phone varchar(20)
)

-- inserting data into the table

insert into university.newStudents (name,email,phone) values
    ('shiiqaalow',' shiiqaalow99@gmail.com','+276789200087'),
    ('hasan','hasan136@gmail.com','+2526789200087'),
 	('maxamed','maxamed638@gmail.com','+252512567532'),
 	('husein','husein093@gmail.com','+27673982467'),
    ('fatima','fatima844@gmail.com','+2526154126424')


-- checking the data

select * from university.newStudents

-- Exercise 1

-- question 1 = finding all students whose name ends with 'd'

select * from university.newStudents where name like '%d'

-- result only this students ends with the letter (d)

 3	maxamed	maxamed638@gamil.com	+252512567532

-- question 2 = finding all students with gmail address

select * from university.newStudents where email like '%gmail.com%'

-- result all includes gmail.com

1	shiiqaalow	shiiqaalow99@gmail.com	+276789200087
2	hasan	hasan136@gmail.com	+2526789200087
3	maxamed	maxamed638@gmail.com	+252512567532
4	husein	husein093@gmail.com	+27673982467
5	fatima	fatima844@gmail.com	+2526154126424


-- question 3 = finding all students with email contains the letter 'o'

select * from university.newStudents where email like '%o%'

-- result all student emails includes o eg:com

1	shiiqaalow	shiiqaalow99@gmail.com	+276789200087
2	hasan	hasan136@gmail.com	+2526789200087
3	maxamed	maxamed638@gmail.com	+252512567532
4	husein	husein093@gmail.com	+27673982467
5	fatima	fatima844@gmail.com	+2526154126424

-- question 4 = finding all students whose names are exactly 4 letters long

select * from university.newStudents where length(name) = 4 like '____%'

-- result all students are more than 4 letters long

1	shiiqaalow	shiiqaalow99@gmail.com	+276789200087
2	hasan	hasan136@gmail.com	+2526789200087
3	maxamed	maxamed638@gmail.com	+252512567532
4	husein	husein093@gmail.com	+27673982467
5	fatima	fatima844@gmail.com	+2526154126424






