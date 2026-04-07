1: create a sample table ?
    create TABLE oldStudents (
        id int primary key auto_increment,
        name varchar(100),
        email varchar(100)
    )


2: insert 1000 + rows (manually, generate or script) ?
    INSERT INTO university.oldStudents (name, email)
    SELECT 
    CONCAT('Student', n) AS name,
    CONCAT('student', n, '@gmail.com') AS email
    FROM (
        SELECT a.N + b.N * 10 + c.N * 100 + 1 AS n
        FROM 
        (SELECT 0 N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
        (SELECT 0 N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) b,
        (SELECT 0 N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) c
    ) numbers
    WHERE n <= 1000;


3: run a query that benefits from an index, then add an index?
    -- adding index
    create index idx_email on oldStudents(email)


4:measure it with and without the index using explain?

    -- first remove the index to test the query without index

    drop index idx_email on oldStudents

    -- without index

    explain select * from university.oldStudents where email  like 'student9%'

    -- result

    id	select_type	    table	    type	possible_keys	key	    key_len	ref	    rows	 filtered       Extra

    1	SIMPLE	    oldStudents		ALL		[null]			[null]     [null]        1000	11.11	    Using where

    -- with index

    create index idx_email on oldStudents(email)

    explain select * from university.oldStudents where email  like 'student9%'

    -- result

    id	select_type	    table	    type	possible_keys	key	    key_len	ref	    rows	 filtered       Extra

    1	SIMPLE	    oldStudents		range	idx_email	  idx_email	    403		    111	       100.0	    Using index condition