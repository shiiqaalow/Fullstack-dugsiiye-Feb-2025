1: Show the last 2 students who registered.

    select * from university.newStudents order by id desc limit 2

    result

    id    name	    email	           phone

    5	fatimah	fatima844@gmail.com   +2526154126424
    4	husein	husein093@gmail.com	  +27673982467

2: Show only students with gmail,sorted by name.

    select * from university.newStudents where email like '%gmail.com' order by name

    result

    id    name	    email	           phone

    5	fatimah	fatima844@gmail.com	 +2526154126424
    4	husein	husein093@gmail.com	 +27673982467
    3	maxamed	maxamed638@gmail.com  +252512567532
    1	shiiqaalow	shiiqaalow99@gmail.com	+276789200087

3: Limit results to 1 row and rename the column to 'Student' and 'Email Address'

    select id ,name as 'Student',email as 'Email Address' from university.newStudents order by id limit 1

    result

    id    Student	    Email Address	       

    1    shiiqaalow	    shiiqaalow99@gmail.com

4: Create your own variaton that uses all 3: ORDER BY, LIMIT, and AS

    select * from university.newStudents order by name asc limit 3

    result

    id    name	    email	           phone

    5	fatimah	 fatima844@gmail.com	+2526154126424
    4	husein	 husein093@gmail.com	+27673982467
    3	maxamed	 maxamed638@gmail.com	+252512567532