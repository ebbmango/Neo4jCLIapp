# DB2 - (Group 4) Kim Heesung & Emanuel Borges

## Introduction
This project's aim is the following:
    a. Design the database of the given file
    b. Implement it with neo4j
    c. The API will retriev the data which satisfying the client's requirments

## Choice of technology
1. javascript 
    : which version ? 
2. npm 
    : 9.8.1
3. npx 
    : which version?
4. Docker 
    : Docker version 26.1.1
5. neo4j for database
    : 5.19.0

## Architecture: components and interactions, optional diagram
How this program works? 

application layer  : communicating with database , implmented by javascript driver? 
data layer : local machine? or docker? 
presentation layer : user interface of the program?

## prerequisite 

1. Install npm
    - `npm install -g npm`

2. Package-lock.json 
-> Need info

3. 




## Installation and setup instructions

1. **Docker Desktop**  
    Please follow the instructions at the [The Official Docker Documentation](https://docs.docker.com/get-docker/) website to download Docker in your local machine.

- After installed docker on your laptop, check it is correctly installed with command below

```linux
$ docker images
```
- To use neo4j image in the container, download neo4j image from here [](https://hub.docker.com/_/neo4j) . 

```linux
$ docker pull neo4j
```
You can also check whether neo4j image correctly installed by the `docker image` command.

- To create container to importing neo4j image, 

```linux
$ docker run neo4j
$ docker ps
```
- If you want to stop, 

```linux
$ docker stop neo4j
```

2. To connect neo4j database on the container, 

```javascript
$ dbcli connect
```

3. **Command Line Interface**
    1. Download this repository into your local machine.

    2. Navigate to the repository's *dbcli* directory.

    3. Once in the *dbcli* directory, choose the installation option that suits you the most:

        1. For those comfortable with enabling **root access**: `sudo npm install -g .` installs the CLI application **globally**. This means that you can use it **anywhere in your machine** by simply running `dbcli <args>`.
        2. For those who would rather not, `npm install .` installs the CLI application and makes it available for usage **in the *dbcli* folder exclusively**. Additionally, [npx](https://docs.npmjs.com/cli/v8/commands/npx) will be needed to run the application: `npx dbcli <args>`

        >!!!!!! in the dbcli folder, `$ dbcli connect` is not working after `npm install .`. Need to correct it !!!!!!!

obs: running `bin/index.js <command> <args>` also works 


## User manual 




## Design of database
- 



## Implementation process, step by step.

- Load data from csv file into neo4j grphical database
```javascript
dbcli load taxonomy_iw.csv

```

- Implement cypher query to get the result of target question number

- Run the functions of runQuery.js



## Project members
**which contributions for what should be reported here !

Barros Borges Emanuel  
Heesung Kim

## Results


- Load CSV file 
```javascript

$ dbcli load taxonomy_iw.csv

Elapsed time : 04m 44s


```

- Find children

```javascript
$


```




## A step-by-step manual how to reproduce the results.

- Connect datbase 
```javascript
user$ dbcli connect

```

- Load CSV file

```javascript
user$ dbcli load taxonomy_iw.csv

```



## Self-evaluation: efficiency should be discussed.



## Strategies for future mitigation of identified shortcomings.



## Description
This project is aim to design of database and implement of the utility with CLI. 
From this project, you can refer to the results which was given by the lecturer. 
As consulted, the technology stack will be MongoDB for the database design operated by 
Java driver on your local machine. 


