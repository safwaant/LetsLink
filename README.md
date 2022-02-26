# Welcome to LetsLink

![PERN Stack Photo](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200402205611/What-is-PERN-Stack.png)

As a group of busy college students, it is often difficult to find a time to meet with everybody.
This is because everybody has their own schedules, and it is hard to find an overlap. Figuring out
a date that works for everyone is a complicated issue that requires the coordination of schedules.

That is why we are creating LetsLink, a schedule sharing website. Users can create accounts, maintain schedules,
and create/join groups.

## Technologies Used
This is a **PERN Stack application** which is made up by four key technologies:

* [PostgreSQL](https://www.postgresql.org/) - object-relational database
* [express.js](https://expressjs.com/) - Node.js web framework
* [react.js](https://reactjs.org/) - a client-side JavaScript framework
* [node.js](https://nodejs.org/en/docs/) - an open source JavaScript web server/runtime


##### Other key technologies used include:

* [nodemon](https://www.npmjs.com/package/nodemon) - automatically restarts node application when file changes are detected


#### More technologies will be added in the future as more features are added

## Project Setup
After cloning the repository to your machine:

Install dependencies in both client and server sides of the application:

`npm install`

To test components of the application:

#### Backend:

make environment file with the following keys' values:
```
MOVIES_DB_URI= "path to mongodb url"
MOVIES_NS = "database name"
PORT = "port number"
```
Head to the backend directory of the project, and run:

`nodemon server`


## Future Scope
We are just starting on this, so right now we are creating the database and starting the API calls for managing the data
in the database.
