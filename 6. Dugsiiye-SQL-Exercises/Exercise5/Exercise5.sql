1: Create a relational schema (students,courses,enrollments)?

    create table students (
        id int primary key auto_increment,
        name varchar(100),
        email varchar(100)
    )

    create table courses (
        id int primary key auto_increment,
        title varchar(100)
    )

    create table enrollments (
        id int primary key auto_increment,
        student_id int,
        course_id int,
        foreign key (student_id) references university.students(id),
        foreign key (course_id) references university.courses(id)
    )

2: insert students, courses, and enrollments ?

    INSERT INTO university.students (name, email) VALUES
        ('Ali', 'ali@gmail.com'),
        ('Amina', 'amina@yahoo.com'),
        ('Fatima', 'fatima@hotmail.com'),
        ('Hassan', 'hassan@outlook.com'),
        ('Khadra', 'khadra@live.com'),
        ('Mohamed', 'mohamed@gmail.com'),
        ('Abdi', 'abdi@yahoo.com'),
        ('Hodan', 'hodan@gmail.com'),
        ('Yusuf', 'yusuf@hotmail.com'),
        ('Maryan', 'maryan@outlook.com'),
        ('Omar', 'omar@live.com'),
        ('Nasra', 'nasra@gmail.com'),
        ('Farah', 'farah@yahoo.com'),
        ('Ibrahim', 'ibrahim@hotmail.com'),
        ('Sahra', 'sahra@gmail.com');

    INSERT INTO university.courses (title) VALUES
        ('Database Systems'),
        ('Web Development'),
        ('Networking'),
        ('Data Structures'),
        ('Operating Systems'),
        ('Computer Architecture'),
        ('Software Engineering'),
        ('Artificial Intelligence'),
        ('Machine Learning'),
        ('Cyber Security'),
        ('Cloud Computing'),
        ('Mobile App Development'),
        ('Algorithms'),
        ('Computer Graphics'),
        ('Human Computer Interaction');

    insert into enrollments (student_id,course_id) values
        (1,1),
        (1,2),
        (1,3),
        (2,4),
        (2,5),
        (2,1),
        (4,6),
        (5,7),
        (6,8),
        (7,8),
        (8,8),
        (9,11),
        (12,13)

3: use inner join to find who is enrolled ?

    -- inner join

    select name ,title from university.enrollments e 
    join university.students s on s.id = e.student_id  
    join university.courses c on c.id = e.course_id 

    result

    name	    title

    Ali	        Database Systems
    Ali	        Web Development
    Ali	        Networking
    Amina	    Data Structures
    Amina	    Operating Systems
    Amina	    Database Systems
    Hassan	    Computer Architecture
    Khadra	    Software Engineering
    Mohamed	    Artificial Intelligence
    Abdi	    Artificial Intelligence
    Hodan	    Artificial Intelligence
    Yusuf	    Cloud Computing
    Nasra	    Algorithms

4: use left join to list all students + their counrses [ null if none ] ?

    -- left join

    select name,title  from university.students s 
    left join university.enrollments e on e.course_id = s.id
    left join university.courses c on e.course_id = c.id 

    result

    name	    title

    Ali	Database Systems
    Amina	Web Development
    Fatima	Networking
    Hassan	Data Structures
    Khadra	Operating Systems
    Mohamed	Computer Architecture
    Abdi	Software Engineering
    Hodan	Artificial Intelligence
    Hodan	Artificial Intelligence
    Hodan	Artificial Intelligence
    Yusuf	[null] 
    Maryan	[null]
    Omar	Cloud Computing
    Nasra	[null]
    Farah	Algorithms
    Ibrahim	[null]
    Sahra	[null]

5: bonus: count how many students per course using group by ?

    select c.title as courses,count(e.student_id) as 'total students' 
    from university.enrollments e 
    join university.courses c on e.course_id  = c.id  
    group BY  c.title

    result

    courses	            total students

    Database Systems	        2
    Web Development	            1
    Networking	                1
    Data Structures	            1
    Operating Systems	        1
    Computer Architecture	    1
    Software Engineering	    1
    Artificial Intelligence	    3
    Cloud Computing	            1
    Algorithms	                1