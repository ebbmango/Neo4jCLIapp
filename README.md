# DB2 - (Group 4) Kim Heesung & Emanuel Borges

## Introduction

This project's aim is the following:
    a. Design the database of the given file
    b. Implement it with neo4j
    c. The API will retriev the data which satisfying the client's requirments


## Choice of technology

1. Node.js (javascript runtime)
    : v18.18.0
2. npm(node.js package manager of module)
    : 9.8.1
3. Docker (application containers)
    : Docker version 26.1.1
4. neo4j for database
    : 5.19.0


## Architecture: components and interactions, optional diagram
<Must revie this section!!>
How this program works? 
Applications runs on docker containers 
Database of neo4j will run by <driver>? 
Presentation will be command line argument API
Which libraries ? Why this libraries? 


## prerequisite 

1. Install node.js
    - [Guide to installation](https://nodejs.org/en/download/package-manager)

2. Place CSV to your working directory 

3. Download this repository into your local machine.


## Installation and setup instructions

1. **Docker Desktop**  
    Please follow the instructions at the [The Official Docker Documentation](https://docs.docker.com/get-docker/) website to download Docker in your local machine.

- After installed docker on your laptop, check it is correctly installed with command below

```bash
$ docker images
```
- To use neo4j image in the container, download neo4j image from here [](https://hub.docker.com/_/neo4j) . 

```bash
$ docker pull neo4j
```
You can also check whether neo4j image correctly installed by the `docker image` command.

- To create container to importing neo4j image, 

```bash
$ docker run neo4j
$ docker ps
```
- If you want to stop, 

```bash
$ docker stop neo4j
```

2. **Command Line Interface**
    - Navigate to the repository's *dbcli* directory.

    - Once in the *dbcli* directory, choose the installation option that suits you the most:

        a. For those comfortable with enabling **root access**: `sudo npm install -g .` installs the CLI application **globally**. This means that you can use it **anywhere in your machine** by simply running `dbcli <args>`.
        b. For those who would rather not, `npm install .` installs the CLI application and makes it available for usage **in the *dbcli* folder exclusively**. Additionally, [npx](https://docs.npmjs.com/cli/v8/commands/npx) will be needed to run the application: `npx dbcli <args>`

        >!!! in the dbcli folder, `$ dbcli connect` is not working after `npm install .`. Need to correct it !!!

obs: running `bin/index.js <command> <args>` also works 

## User manual 

0. Connect neo4j databas with the command
```bash
$ dbcli connect
```

1. Load CSV file into your database

- It referes to [Optimizing LOAD CSV for performance](https://neo4j.com/docs/getting-started/data-import/csv-import/#optimizing-load-csv) to secure performance wise to load csv file. 

```bash
$ dbcli load taxonomy_iw.csv
```

2. Run command in your terminal. 

```bash
$ dbcli <Question Number> <Given node>
ex. $ dbcli 1 1880s_films
```

## Design of database
- how design of database ? <Please locate how to desing of this database>




## Implementation process, step by step.

1. Implementation to loading CSV file. 

 - Sets up a UNIQUENESS constraint on the "name" property of each "Category" node
 ```javascript
 const constraintsQuery = `
CREATE CONSTRAINT IF NOT EXISTS FOR (c:Category)
REQUIRE c.name IS UNIQUE;
`;
 ```

 - Generates nodes 
 ```javascript
const loadCategoriesQuery = `
LOAD CSV FROM $filePath AS row
WITH trim(row[0]) AS category, trim(row[1]) AS subcategory
WHERE category IS NOT NULL AND subcategory IS NOT NULL
CALL {
  WITH category, subcategory
  MERGE (c:Category {name: category})
  MERGE (s:Category {name: subcategory})
} IN TRANSACTIONS OF 100000 ROWS;
`;
 ```

- Add edges between category and subcategory columns
```javascript
const loadRelationshipsQuery = `
LOAD CSV FROM $filePath AS row
WITH trim(row[0]) AS category, trim(row[1]) AS subcategory
WHERE category IS NOT NULL AND subcategory IS NOT NULL
CALL {
  WITH category, subcategory
  MATCH (c:Category {name: category})
  MATCH (s:Category {name: subcategory})
  MERGE (c)-[:HAS_SUBCATEGORY]->(s)
} IN TRANSACTIONS OF 100000 ROWS;
`;
```

2. Implement cypher query to get the result of target question number

- For example, if you find a children of given node, 

```javascript
const findChildrenQuery = ` 
MATCH (node:Category {name: $categoryName})-[:HAS_SUBCATEGORY]->(child:Category) 
RETURN child 
ORDER BY child.name ASC 
`;
```

- Other details implementation can be found in here `queries\cypherQueries.js`. 


3. Implement command scripts to employing cypher query script. 

- To execute query with command, applies predefiend functions of `runQuery.js`. 
- To display results of performance wise, it applies `displayResult.js`.

## Results

1. Load CSV file 
```bash
$ dbcli load taxonomy_iw.csv

Elapsed time : 04m 44s
```

2. Find children

```bash
$ dbcli 1 Alexander_Lukashenko

[ Lukashenko_family]
Elapsed time : 0.0191s
Vs 1.589s of MongoDB
```

3. Count children

```bash
$ dbcli 2 Alexander_Lukashenko

1
Elapsed time : 0.0606s
Vs 1.447s of MongoDB
```

4. Find grandchildren

```bash
$ dbcli 3 Alexander_Lukashenko

[]
Elapsed time : 0.1088s
Vs 1.441s of MongoDB
```

5. Find parent

```bash
$ dbcli 4 Alexander_Lukashenko
[
    Belarusian_individuals_subject_to_the_U.S._Department_of_the_Treasury_sanctions,
    Presidents_of_Belarus
]

Elapsed time : 0.0196s
Vs 1.486s of MongoDB
```

6. Count parent

```bash
$ dbcli 5 Alexander_Lukashenko

2
Elapsed time : 0.0440s
```

7. Find grandparents

```bash
$ dbcli 6 Alexander_Lukashenko

[
    Belarus-United_States_relations,
    Candidates_for_President_of_Belarus,
    Government_of _Belarus,
    Heads_of_state_of_Belarus,
    political office-holders_ in_Belarus,
    Presidents_by_country,
    sanctions_against_Belarus
    United_States_Department_of_the_Treasury,
    United States sanctions
]
Elapsed time : 0.0213s
Vs 1.707s of MongoDB
```

8. Find unique nodes

```bash
$ dbcli 7 

2031337
Elapsed time : 0.1998s

```

9. Find root nodes

```bash
$ dbcli 8 (--amount = <number>)
[
    The_Jesus _and_Mary_Chain,
    Vladimir_ Basov,
    Blink-182,
    "Terence _Trent _DArby",
    Zhou_Shen,
    Chris Cutler
]
Elapsed time : 0.4805s
```

10. Find nodes with the most children
```bash
$ dbcli 9 

[ Albums_by_artist ]

Elapsed time : 3.3786s
```

11. Find nodes with the least children (number of children is greater than zero)

```bash
$ dbcli 10

[ 
    Suhut District,
    Sar Mountains,
    Savnik_Municipality,
    sid,
    silute,
    Suto orizari Municipality,
    ZorY,
    ...
]

Elapsed time : 4.3682s
```

12. Renames a given node 

```bash
$ dbcli 11 Alexander-Lukashenko Kim_Heesung

Successfuly renamed the node Alexander_ Lukashenko to Kim_Heesung
Elapsed time : 0.0698s
```

13. Find all paths between two given nodes, with directed edge from the first to the second node

```bash
$ dbcli 12 "Government_of _Belarus" "Lukashenko_family"

[
    ** Please add your terminal results**

]
```

## A step-by-step manual how to reproduce the results.

- First, successfully connect your database with docker again. (Please refer to user manual how to connect datbase)

- Second, positioned to *dbcli* directory, run the command with questions nubmer and node. 

```bash
$ dbcli <Question Number> <Given node>
```


## Self-evaluation: efficiency should be discussed.

- As applied docker containter, it can improve to run database system efficiently. 
- As customized command line programmed, it helps user to run command easily with question number and node to find answer. 
- By applying the optimzing loading CSV, it improves the efficience of importing files. It also compares to import using Mongoimport, which take more times(about 2 minutes more). 
- Neo4j,graphical database, has more powerful to find complex relationships between nodes. It can be said that cypher languager can be direct intuitive way to implement it compares to document style of Mongodb.



## Strategies for future mitigation of identified shortcomings.
- Please indentify some shortcomings of this program. then explain how to mitigate. 


## Project members
**which contributions for what should be reported here !

Barros Borges Emanuel  
- <Add your contributions>

Heesung Kim
- Lead project and outline of database architecture
- Scheduling meeting to reach milestone
- Documentataion 
- Present of projects outcomes
- Consultation of test results
- Compares to Mongodb for the performance wise


## Description
<!-- This project is aim to design of database and implement of the utility with CLI. 
From this project, you can refer to the results which was given by the lecturer. 
As consulted, the technology stack will be MongoDB for the database design operated by 
Java driver on your local machine.  -->


