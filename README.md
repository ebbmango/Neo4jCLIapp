# DB2 - (Group 4) Kim Heesung & Emanuel Borges

## Introduction

This project's aim is the following:

1. Devise a database in which to organize the data given by the file "taxonomy_iw.csv", effectively mimicking [Wikipedia](https://www.wikipedia.org/)'s articles' hierarchical taxonomy at a given point in time.

2. Implement it using Neo4j.

3. Develop a Command Line Interface (CLI) to facilitate interaction with the database, adhering to a predetermined set of functionalities. The CLI will enable users to perform specified tasks, such as data retrieval and manipulation, through the issuance of commands.

## Choice of technology

1. **JavaScript**: The programming language used for developing the CLI application. It is utilized within the Node.js environment to write the logic, functionality, and behavior of the CLI.

2. **Node.js**: The [runtime environment](https://stackoverflow.com/questions/3900549/what-is-runtime) that allows [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) code to be executed outside of a web browser. It is recommended to be at version 18 or later.

3. **npm**: [Package manager for Node.js](https://www.npmjs.com/) which is used for installing, sharing, and managing dependencies for Node.js projects. This project requires a minimum version of 6.0.0. However, it is strongly recommended to use the latest available version.

4. **Docker**: A platform for [containerizing](https://aws.amazon.com/what-is/containerization/) applications. We used [Docker](https://www.docker.com/) to instantiate the database, ensuring our application's portability and consistency across different environments.

5. **Neo4j**: The chosen database management system for storing and managing the relevant data. Given that our data consists entirely of nodes connected by a single directed ridge, we decided that [Neo4j](https://neo4j.com/) – being a [graph database](https://neo4j.com/docs/getting-started/get-started-with-neo4j/graph-database/) system – would more efficiently suit our neeeds.

## Architecture: components and interactions, optional diagram

<Must revie this section!!>
How this program works?
Applications runs on docker containers
Database of neo4j will run by <driver>?
Presentation will be command line argument API
Which libraries ? Why this libraries?

## Prerequisites

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

   - Navigate to the repository's _dbcli_ directory.

   - Once in the _dbcli_ directory, choose the installation option that suits you the most:

     a. For those comfortable with enabling **root access**: `sudo npm install -g .` installs the CLI application **globally**. This means that you can use it **anywhere in your machine** by simply running `dbcli <args>`.
     b. For those who would rather not, `npm install .` installs the CLI application and makes it available for usage **in the _dbcli_ folder exclusively**. Additionally, [npx](https://docs.npmjs.com/cli/v8/commands/npx) will be needed to run the application: `npx dbcli <args>`

     > !!! in the dbcli folder, `$ dbcli connect` is not working after `npm install .`. Need to correct it !!!

obs: running `bin/index.js <command> <args>` also works

## User manual

#### Ensure connection to the database

```bash
$ dbcli connect
```

#### Loading the CSV file into your database

To load the CSV file into the database, first the **file must be located at the _import_ directory** of the _dbcli_ folder:

```
$ ls dbcli/import
taxonomy_iw.csv
```

This is due to (Neo4j's)[https://neo4j.com/docs/getting-started/data-import/csv-import/] and Docker's configuration. In short: to import files

- It referes to [Optimizing LOAD CSV for performance](https://neo4j.com/docs/getting-started/data-import/csv-import/#optimizing-load-csv) to secure performance wise to load csv file.

```bash
$ dbcli load taxonomy_iw.csv
```

#### Interacting with the database

```bash
$ dbcli <Question Number> <Given node>
ex. $ dbcli 1 1880s_films
```

## Database design

The design of the database is very simple, and further insight can be gained on it by reading the Cypher Queries used to load the data from the CSV file into the database. These queries can be found in the _queries_ directory, specifically queries `loadCategoriesQuery` and `loadRelationshipsQuery` from the file _uploadQueries.js_.

In summary, as previously stated, it consists entirely of **nodes connected by a single directed ridge.** Each node represents an article in Wikipedia, and all the nodes to which it connects represent a subarticle, so to speak, that is: an article to which it connects.

This effectively mimicks Wikipedia's articles' taxonomy at a given point in time, with broader and more general articles encompassing and nesting narrower and more specialized articles, as can be seen [in the examples below](#results).

## Implementation process

<!-- ASK TEACHER: Is it about the implementation of the database or the CLI? -->

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

#### Setting up of the database:

Loading the data from the CSV file into the database.

```
$ dbcli load taxonomy_iw.csv
✔ Nodes loaded successfully.
✔ Relationships loaded successfully.
✔ Database has been successfully filled with data from the CSV file.

Elapsed time: 04m 43s 728ms
```

#### Task 01

Finding all children of a given node:

```
$ dbcli 1 Engineering_universities_and_colleges_in_Poland
All children of the node "Engineering_universities_and_colleges_in_Poland":

[
  AGH_University_of_Science_and_Technology,
  Szczecin_University_of_Technology,
  Wrocław_University_of_Science_and_Technology,
  Łódź_University_of_Technology
]

Execution time: 0.0184 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 02

Counting all children of a given node:

```
dbcli 2 Engineering_universities_and_colleges_in_Poland
The amount of children of the node "Engineering_universities_and_colleges_in_Poland" is:
4

Execution time: 0.0495 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 03

Finding all grandchildren of a given node:

```
$ dbcli 3 Presidents_of_Belarus
All grandchildren of the node "Presidents_of_Belarus":

[ Lukashenko_family ]

Execution time: 0.0158 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 04

Finding all parents of a given node:

```
$ dbcli 4 Tourism_in_South_Korea
All parents of the node "Tourism_in_South_Korea":

[
  Service_industries_in_South_Korea,
  Tourism_by_country,
  Tourism_in_Asia_by_country,
  Tourism_in_Korea
]

Execution time: 0.0161 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 05

Counting all parents of a given node:

```
$ dbcli 5 Tourism_in_South_Korea
The amount of parents of the node "Tourism_in_South_Korea" is:
4

Execution time: 0.0353 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 06

Finding all grandparents of a given node:

```
$ dbcli 6 Tourism_in_South_Korea
All grandparents of the node "Tourism_in_South_Korea":

[
  Industry_in_South_Korea,
  Leisure_by_country,
  Service_industries_by_country,
  Service_industries_by_country,
  Service_industries_in_Asia_by_country,
  Service_industries_in_Asia_by_country,
  Service_industries_in_Korea,
  Tourism,
  Tourism_in_Asia,
  Tourism_in_Asia
]

Execution time: 0.0367 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 07

Counting how many uniquely named nodes there are:

```
$ dbcli 7
The amount of uniquely named nodes is:
2031337

Execution time: 0.3419 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 08

Finding a root node (i.e., one which is not a subcategory of any other node):

```
$ dbcli 8
List of 1 randomly selected root node(s):

[ Pope_Urban_II ]

Execution time: 0.7335 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 09

Finding the node(s) with the most children (there could be more than one, if they are tied for the first place):

```
$ dbcli 9
✔ Query completed.

Nodes with the highest amount of children:

[ Albums_by_artist ]

Execution time: 3.1954 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 10

Finding the node(s) with the least amount of children, excluding entirely childless nodes:

<!-- Include --limit=number in the command to limit the amount of nodes get to fit the terminal window. -->

```
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

<!-- Insert mongoDB time here -->

---

#### Task 11

Renaming a given node:

```
$ dbcli 11 Leonardo_da_Vinci Kim_Heesung
✔ Successfuly renamed the node Leonardo_da_Vinci to Kim_Heesung

Execution time: 0.0701 seconds
```

<!-- Insert mongoDB time here -->

---

#### Task 12

Finding all paths between two given nodes, with directed edge from the first to the second node:

```
$ dbcli 12 15th-century_Italian_painters Paintings_by_Leonardo_da_Vinci
✔ Query completed.

All paths between nodes "15th-century_Italian_painters" and "Paintings_by_Leonardo_da_Vinci" (up to 15 levels deep):

15th-century_Italian_painters
 →  Kim_Heesung
 →  Works_by_Leonardo_da_Vinci
 →  Paintings_by_Leonardo_da_Vinci (depth: 3)

15th-century_Italian_painters
 →  Italian_Renaissance_painters
 →  Kim_Heesung
 →  Works_by_Leonardo_da_Vinci
 →  Paintings_by_Leonardo_da_Vinci (depth: 4)

Execution time: 1.3789 seconds
```

<!-- Insert mongoDB time here -->

---

## How to reproduce the results

1. Make sure you have the [pre-requisites](#prerequisites) installed on your local machine.

2. Follow the [installation and setup instructions](#installation-and-setup-instructions).

3. Make sure to be running [Docker Desktop](https://www.docker.com/products/docker-desktop/) on the background.

4. Navitage to the `dbcli` directory.

5. Ensure database connection.
<!-- Create section dedicated to this -->

6. Run the command `dbcli` followed by the task number. Command-specific syntax can be found by running the command with the `--help` flag:

```
$ dbcli <task_number> --help
```

## Self-evaluation: efficiency should be discussed.

- As applied docker containter, it can improve to run database system efficiently.
- As customized command line programmed, it helps user to run command easily with question number and node to find answer.
- By applying the optimzing loading CSV, it improves the efficience of importing files. It also compares to import using Mongoimport, which take more times(about 2 minutes more).
- Neo4j,graphical database, has more powerful to find complex relationships between nodes. It can be said that cypher languager can be direct intuitive way to implement it compares to document style of Mongodb.

## Strategies for future mitigation of identified shortcomings.

- Please indentify some shortcomings of this program. then explain how to mitigate.

## Project members

\*\*which contributions for what should be reported here !

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
