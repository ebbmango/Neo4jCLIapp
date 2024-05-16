# DB2 - (Group 4) Kim Heesung & Emanuel Borges

## Introduction
<!-- This project's aim is the following:
    a. Design the database of the given file
    b. Implement it with MongoDB
    c. The API will retriev the data which satisfying the client's requirments -->

Text comes here

## Installation & prerequisite

- **Docker Desktop**  
    Please follow the instructions at the [The Official Docker Documentation](https://docs.docker.com/get-docker/) website to download Docker in your local machine.

- **Command Line Interface**
    1. Download this repository into your local machine.

    2. Navigate to the repository's *dbcli* directory.

    3. Once in the *dbcli* directory, choose the installation option that suits you the most:

        1. For those comfortable with enabling **root access**: `sudo npm install -g .` installs the CLI application **globally**. This means that you can use it **anywhere in your machine** by simply running `dbcli <args>`.
        2. For those who would rather not, `npm install .` installs the CLI application and makes it available for usage **in the *dbcli* folder exclusively**. Additionally, [npx](https://docs.npmjs.com/cli/v8/commands/npx) will be needed to run the application: `npx dbcli <args>`

obs: running `bin/index.js <command> <args>` also works 

## Design of database

<!-- To begin with MongDB, please run your database in your local machine
 : `brew services start mongodb-community@7.0`
You can also quit the database whenever you want 
 : `brew services stop mongodb-community@7.0`

1. Make a relationship with objects within the database. 
    - TREE like structures between objects
    - 'Reference' type documentations to implements `$graphlookup` for the query

To learn more about [references](https://www.mongodb.com/docs/manual/data-modeling/concepts/embedding-vs-references/#std-label-data-modeling-referencing), please refer to the link. 

2. Mapping the schema relationships
    - Mapping relationships between data entities affects your application's performance and scalability.
    - The imported database may have many-to-many relationship between fields 
    - To optimize queries, it should refer to the _ID in other collections. [Example](https://www.mongodb.com/docs/manual/data-modeling/schema-design-process/map-relationships/#std-label-data-modeling-map-relationships)

3. The extended pattern 
    - Here is the example [Extended pattern](https://www.mongodb.com/blog/post/building-with-patterns-the-extended-reference-pattern)


4. Aggregation pipelines
    - To build database pattern of tree structue, it applies [Aggregation](https://www.mongodb.com/docs/manual/core/aggregation-pipeline-optimization/)


*** -->

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

## Project members
**which contributions for what should be reported here !

Barros Borges Emanuel  
Chakraborty Pritam\
Heesung Kim

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap (can be editted)
1. Select the right database
2. Generate the datamodel of the projects
3. Investigate the imported CSV files and objects relations. 
4. Implement the query to satisfying the client requirements.
5. Validate the results of unit testings. 


## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## License

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
