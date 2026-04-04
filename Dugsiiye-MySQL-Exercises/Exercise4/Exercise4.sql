create table Dugsiiye (
	id int primary key auto_increment,
	name varchar(100),
    email varchar(100),
	score int
)

INSERT INTO university.Dugsiiye (name, email, score) VALUES
    ('Ali', 'ali@gmail.com', 85),
    ('Amina', 'amina@yahoo.com', 90),
    ('Fatima', 'fatima@hotmail.com', 78),
    ('Hassan', 'hassan@outlook.com', 88),
    ('Khadra', 'khadra@live.com', 92),
    ('Mohamed', 'mohamed@gmail.com', 75),
    ('Abdi', 'abdi@yahoo.com', 80),
    ('Hodan', 'hodan@gmail.com', 89),
    ('Yusuf', 'yusuf@hotmail.com', 70),
    ('Maryan', 'maryan@outlook.com', 95),
    ('Omar', 'omar@live.com', 82),
    ('Nasra', 'nasra@gmail.com', 87),
    ('Farah', 'hodan@gmail.com', 76),
    ('Ibrahim', 'ibrahim@yahoo.com', 84),
    ('Sahra', 'sahra@hotmail.com', 85);

1. How many students total?

    select count(*) as 'Total Students' from university.Dugsiiye

    result

    total students

    15

2. What’s the highest and lowest score?

    select max(score) as 'Top Score',min(score) as 'Lowesr Score' from university.Dugsiiye

    result

    Top Score	Lowest Score

    95	            70

3. How many students per domain?

    -- first i did update one of the students score to 85 to make sure that we have 2 students with the same score to test the count function

    update university.Dugsiiye set score = 85 where id = 15

    -- now the query to count the number of students per score


    select score, count(*) as 'domain' from university.Dugsiiye group by score

    result

    score	domain

    85	        2
    90	        1
    78	        1
    88	        1
    92	        1
    75	        1
    80	        1
    89	        1
    70	        1
    95	        1
    82	        1
    87	        1
    76	        1
    84	        1

4. What is the average score of each domain group?

    select substring_index(email,'@',-1) as domain,
    avg(score) as 'avarage domains' 
    from university.Dugsiiye group by domain

    result

    domain	   avarage domains

    gmail.com	 82.4000
    yahoo.com	 84.6667
    hotmail.com	 77.6667
    outlook.com	 91.5000
    live.com	 87.0000

