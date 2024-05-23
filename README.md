# DB2 - (Group 4) Kim Heesung & Emanuel Borges

## Introduction
<!-- This project's aim is the following:
    a. Design the database of the given file
    b. Implement it with MongoDB
    c. The API will retriev the data which satisfying the client's requirments -->

## Choice of technology
1. javascript 
    : which version ? 
2. npm 
    : which version ? 
3. npx 
    : which version?
4. docker 
    : Docker version 26.1.1
    : 
5. neo4j for database
    : 5.19.0


## Architecture: components and interactions, optional diagram
How this program works? 

application layer  : communicating with database , implmented by javascript driver? 
data layer : local machine? or docker? 
presentation layer : user interface of the program?

## prerequisite 





## Installation and setup instructions

- **Docker Desktop**  
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




- **Command Line Interface**
    1. Download this repository into your local machine.

    2. Navigate to the repository's *dbcli* directory.l

    3. Once in the *dbcli* directory, choose the installation option that suits you the most:

        1. For those comfortable with enabling **root access**: `sudo npm install -g .` installs the CLI application **globally**. This means that you can use it **anywhere in your machine** by simply running `dbcli <args>`.
        2. For those who would rather not, `npm install .` installs the CLI application and makes it available for usage **in the *dbcli* folder exclusively**. Additionally, [npx](https://docs.npmjs.com/cli/v8/commands/npx) will be needed to run the application: `npx dbcli <args>`

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





# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.


## Description
This project is aim to design of database and implement of the utility with CLI. 
From this project, you can refer to the results which was given by the lecturer. 
As consulted, the technology stack will be MongoDB for the database design operated by 
Java driver on your local machine. 

/*
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.
*/

